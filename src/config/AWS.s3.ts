import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECREY_ACCESS_KEY as string,
  },
});

export default s3;
