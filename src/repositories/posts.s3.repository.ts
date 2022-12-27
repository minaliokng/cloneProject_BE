import { S3 } from '@aws-sdk/client-s3';

class PostsS3Repository {
  s3: S3;

  constructor(s3: any) {
    this.s3 = s3;
  }

  deleteS3Image = (imageKey: string) => {
    return this.s3.deleteObject({
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: 'clon-project/'.concat(imageKey),
    });
  };
}

export default PostsS3Repository;
