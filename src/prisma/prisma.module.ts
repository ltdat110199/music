import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PrismaService, ConfigService],
  exports: [PrismaService],
})
export class PrismaModule {}
