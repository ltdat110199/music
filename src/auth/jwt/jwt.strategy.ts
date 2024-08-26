import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    public prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const { sub, email } = payload;

    if (!sub || !email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return { userId: sub, email };
  }
}
