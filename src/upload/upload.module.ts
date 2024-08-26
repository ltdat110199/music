import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.config';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  providers: [UploadService, CloudinaryProvider, CloudinaryService],
  controllers: [UploadController]
})
export class UploadModule {}
