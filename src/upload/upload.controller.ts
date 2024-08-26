import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
   uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: any,
  ) {
    console.log(file);
    return this.uploadService.uploadFile(file, uploadFileDto.file_type);
  }
}
