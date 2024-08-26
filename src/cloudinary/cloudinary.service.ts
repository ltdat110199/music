import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Stream } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      const bufferStream = new Stream.PassThrough();
      bufferStream.end(file.buffer); // Đẩy buffer vào stream

      bufferStream.pipe(uploadStream); // Truyền stream vào uploadStream
    });
  }
}
