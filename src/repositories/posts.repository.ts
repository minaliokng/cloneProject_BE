import { PrismaMySqlRepository } from '../modules/repository.module';

class PostsRepository extends PrismaMySqlRepository {
  public async findOneByPostId(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        postId,
      },
    });

    return post;
  }
}

export default PostsRepository;
