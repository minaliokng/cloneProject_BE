import * as multer from 'multer';
import * as multers3 from 'multer-s3';
import s3 from '../config/AWS.s3';

const multeruploader = multer({
  storage: multers3({
    s3,
    bucket: process.env.S3_BUCKET_NAME as string,
    acl: 'public-read',
    key(req, file, callback) {
      callback(null, `clon-project/${Date.now()}_${file.originalname}`);
    },
  }),
});

export default multeruploader;
