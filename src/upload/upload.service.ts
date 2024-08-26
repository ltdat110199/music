import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(file: Express.Multer.File, fileType: string) {
    const folder = fileType === 'image' ? 'images' : 'music';
    try {
      const uploadFile = await this.cloudinaryService.uploadFile(file, folder);
      return {
        url: uploadFile.secure_url,
        result: true
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new BadRequestException(error);
    }
  }
}
