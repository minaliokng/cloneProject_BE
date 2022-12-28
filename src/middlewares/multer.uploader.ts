import { Request } from 'express';
import * as multer from 'multer';
import * as multers3 from 'multer-s3';
import * as shortid from 'shortid';
import s3 from '../config/AWS.s3';

const multeruploader = multer({
  storage: multers3({
    s3,
    bucket: process.env.S3_BUCKET_NAME as string,
    acl: 'public-read',
    key(req, file, callback) {
      callback(
        null,
        `clon-project/${Date.now()}_${shortid.generate()}.${
          file.originalname.split('.')[file.originalname.split('.').length - 1]
        }`
      );
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    const filenameExtension = file.originalname.split('.')[file.originalname.split('.').length - 1];
    if (
      filenameExtension === 'jpg' ||
      filenameExtension === 'png' ||
      filenameExtension === 'jpeg' ||
      filenameExtension === 'gif' ||
      filenameExtension === 'bmp' ||
      filenameExtension === 'tiff'
    ) {
      callback(null, true);
    } else {
      callback(new Error('이미지 확장자 아님'));
    }
  },
});

export default multeruploader;
