import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { add } from 'date-fns';
import { format, fromZonedTime } from 'date-fns-tz';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: any) {
    try {
      const userService = await this.prismaService.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (userService != null && userService.email == createUserDto.email) {
        throw new NotFoundException('Email already in use');
      }
      const user = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          fullname: createUserDto.fullname,
          avatar: createUserDto.avatar ?? '',
        },
        select: {
          id: true,
          email: true,
          fullname: true,
        },
      });
      return await this.signJwtToken(user.id, user.email, user.fullname);
    } catch (error) {
      if (error.code === 'P2002' && error.meta.target.includes('email')) {
        throw new NotFoundException('Email already in use');
      }
      throw error;
    }
  }

  async login(loginDto: any) {
    const user1 = await this.prismaService.user.findMany();
    console.log(user1);

    const user = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
    });
    console.log(user);

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const passwordMatched =
      user.password.toUpperCase() == loginDto.password.toUpperCase();
    if (!passwordMatched) {
      throw new NotFoundException('Invalid credentials');
    }

    return await this.signJwtToken(user.id, user.email, user.fullname);
  }
  formatDate(date: Date) {
    const expirationTimeUTC = add(date, { minutes: 60 });

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the local time zone
    const expirationTimeLocal = fromZonedTime(expirationTimeUTC, timeZone);

    const formattedExpirationTimeLocal = format(
      expirationTimeLocal,
      "yyyy-MM-dd' 'HH:mm",
      { timeZone },
    );
    return formattedExpirationTimeLocal;
  }
  async signJwtToken(
    userId: number,
    email: string,
    fullname: string,
  ): Promise<{
    access_token: string;
    result: boolean;
    period_token: string;
    email: string;
    fullname: string;
  }> {
    const payload = { sub: userId, email };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret: this.configService.get('JWT_SECRET'),
    });

    const period_token = this.formatDate(new Date());
    return {
      result: true,
      access_token: jwtString,
      period_token,
      email: email,
      fullname: fullname,
    };
  }

  //   async updateUser(
  //     userId: number,
  //     updateUserDto: UpdateUserDto,
  //   ): Promise<User> {
  //     const user = await this.prismaService.user.findUnique({
  //       where: { id: userId },
  //     });
  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }
  //     const hashedPassword = await argon.hash(updateUserDto.password);

  //     return this.prismaService.user.update({
  //       where: { id: userId },
  //       data: {
  //         email: updateUserDto.email,
  //         password: hashedPassword,
  //         name: updateUserDto.name,
  //         age: updateUserDto.age,
  //         avatar: updateUserDto.avatar,
  //         phone: updateUserDto.phone,
  //         role: updateUserDto.role,
  //       },
  //     });
  //   }
  async refreshToken(token: any) {
    const refreshToken = token.refreshToken;
    const decoded = this.jwtService.verify(refreshToken);

    if (!decoded || !decoded.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: decoded.sub },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const accessToken = this.generateAccessToken(user.id, user.email);

    const expirationTime = this.formatDate(new Date());
    return {
      result: true,
      accessToken,
      refreshToken,
      expirationTime,
    };
  }

  private generateAccessToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    console.log(payload);

    return this.jwtService.sign(payload, {
      expiresIn: '60m',
    });
  }
}
