import { S3 } from '@aws-sdk/client-s3';

const s3Setting = new S3({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_PROFILE as string,
    secretAccessKey: process.env.S3_SECRET_KEY_PROFILE as string,
  },
});

export default s3Setting;
