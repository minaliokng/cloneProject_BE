import * as multer from 'multer';
import * as multers3 from 'multer-s3';
import { Request } from 'express';
import * as shortid from 'shortid';
import s3 from '../config/AWS.profile';

const multeruploader = multer({
  storage: multers3({
    s3,
    bucket: process.env.BUCKET_NAME_PROFILE as string,
    acl: 'public-read',
    key(req, file, callback) {
      const fileType = file.mimetype.split('/')[1];

      callback(null, `clone-project/${shortid.generate()}.${fileType}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    const fileType = file.mimetype.split('/')[0];
    if (fileType === 'image') {
      callback(null, true);
    } else {
      callback(new Error('이미지 확장자 아님'));
    }
  },
});

const deleteS3Image = (profileImage: string) => {
  s3.deleteObject({
    Bucket: process.env.BUCKET_NAME_PROFILE as string,
    Key: `clone-project/${profileImage}`,
  });
};

export { multeruploader, deleteS3Image };
