import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './album/album.module';
import { SongModule } from './song/song.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    AlbumModule,
    SongModule,
    UploadModule,
  ],
  controllers: [],
  providers: [PrismaService, JwtService, AuthService, UserService],
})
export class AppModule {}
