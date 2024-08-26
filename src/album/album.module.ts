import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
