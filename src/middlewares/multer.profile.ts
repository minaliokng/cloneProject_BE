import * as multer from 'multer';
import * as multers3 from 'multer-s3';
import * as shortid from 'shortid';
import { badRequest } from '@hapi/boom';
import s3 from '../config/AWS.profile';

const multeruploader = multer({
  storage: multers3({
    s3,
    bucket: process.env.BUCKET_NAME_PROFILE as string,
    acl: 'public-read',
    key(req, file, callback) {
      const fileType = file.mimetype.split('/');

      // if (fileType[0] === 'image')
        callback(null, `clone-project/${shortid.generate()}.${fileType[1]}`);
      // else {
      //   callback(null);
      // }
    },
  }),
});

export default multeruploader;
