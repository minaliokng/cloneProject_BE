import { PrismaMySqlRepository } from '../modules/repository.module';

class CommentsRepository extends PrismaMySqlRepository {
  public async create(userId: number, content: string, postId: number) {
    await this.prisma.comment.create({
      data: {
        user: { connect: { userId } },
        content,
        post: { connect: { postId } },
      },
    });
  }

  public async findMany(postId: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId,
      },
      select: {
        commentId: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            userId: true,
            profileImage: true,
            userName: true,
          },
        },
      },
    });

    return comments;
  }

  public async findOneBy(commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        commentId,
      },
    });

    return comment;
  }

  public async updateOne(commentId: number, content: string) {
    await this.prisma.comment.update({
      where: {
        commentId,
      },
      data: {
        content,
      },
    });
  }

  public async deleteOne(commentId: number) {
    await this.prisma.comment.delete({
      where: {
        commentId,
      },
    });
  }
}

export default CommentsRepository;
