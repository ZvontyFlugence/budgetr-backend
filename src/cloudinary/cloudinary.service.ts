import { BadRequestException, Injectable } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(base64: string) {
    let promise: Promise<UploadApiResponse | UploadApiErrorResponse> =
      new Promise((resolve, reject) => {
        v2.uploader.upload(base64, (error, result) => {
          if (error) {
            console.error(error);
            return reject(error);
          }

          resolve(result!);
        });
      });

    let result = await promise;
    if (result?.url) return (result as UploadApiResponse).url;
    else throw new BadRequestException('Cloudinary Upload Error');
  }
}
