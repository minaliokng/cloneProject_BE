import { PrismaClient } from '@prisma/client';

class PostsRepository {
  prisma: PrismaClient;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  createPost = async (
    title: string,
    changedContent: string,
    privateOption: number,
    userId: number,
    postImage?: string
  ) => {
    await this.prisma.post.create({
      data: { title, changedContent, privateOption, userId, postImage },
    });
  };

  getPostsOrderByTime = async () => {
    const posts = await this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      where: { privateOption: 1 },
      select: {
        postId: true,
        postImage: true,
        title: true,
        changedContent: true,
        createdAt: true,
        user: { select: { userName: true, profileImage: true } },
        _count: { select: { comments: true } },
      },
    });
    return posts;
  };

  getPostsOrderByCount = async () => {
    const posts = await this.prisma.post.findMany({
      orderBy: [{ comments: { _count: 'desc' } }, { createdAt: 'desc' }],
      where: { privateOption: 1 },
      select: {
        postId: true,
        postImage: true,
        title: true,
        changedContent: true,
        createdAt: true,
        user: { select: { userName: true, profileImage: true } },
        _count: { select: { comments: true } },
      },
    });
    return posts;
  };

  getPost = async (postId: number) => {
    const post = await this.prisma.post.findFirst({
      where: { postId, privateOption: 1 },
      select: {
        postId: true,
        postImage: true,
        title: true,
        changedContent: true,
        createdAt: true,
        user: { select: { userId: true, userName: true, profileImage: true } },
        _count: { select: { comments: true } },
      },
    });
    return post;
  };

  findOneByPostId = async (postId: number) => {
    const existPost = await this.prisma.post.findUnique({ where: { postId } });
    return existPost;
  };

  getWrittenPost = async (postId: number) => {
    const writtenPost = await this.prisma.post.findFirst({
      where: { postId },
      select: {
        title: true,
        changedContent: true,
        postImage: true,
        privateOption: true,
        userId: true,
      },
    });
    return writtenPost;
  };

  updatePost = async (
    postId: number,
    title: string,
    changedContent: string,
    privateOption: number
  ) => {
    await this.prisma.post.updateMany({
      where: { postId },
      data: { title, changedContent, privateOption },
    });
  };

  deletePost = async (postId: number) => {
    await this.prisma.post.delete({ where: { postId } });
  };
}

export default PostsRepository;
