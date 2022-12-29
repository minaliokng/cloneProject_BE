import { badRequest, unauthorized } from '@hapi/boom';
import prisma from '../config/databases/prisma';
import CommentsRepository from '../repositories/comments.repository';
import UsersRepository from '../repositories/users.repository';
import PostsRepository from '../repositories/posts.repository';

class CommentsService {
  commentsRepository: CommentsRepository;

  usersRepository: UsersRepository;

  postsRepository: PostsRepository;

  constructor() {
    this.commentsRepository = new CommentsRepository(prisma);
    this.usersRepository = new UsersRepository(prisma);
    this.postsRepository = new PostsRepository(prisma);
  }

  public async createComment(userId: number, content: string, postId: number): Promise<void> {
    const user = await this.usersRepository.findOneByUserId(userId);
    if (!user) throw badRequest('유저가 존재하지 않음');

    const post = await this.postsRepository.findOneByPostId(postId);
    if (!post) throw badRequest('게시글이 존재하지 않음');

    await this.commentsRepository.create(userId, content, postId);
  }

  public async getComments(postId: number) {
    const post = await this.postsRepository.findOneByPostId(postId);
    if (!post) throw badRequest('게시글이 존재하지 않음');

    const comments = await this.commentsRepository.findMany(postId);

    return comments.map((comment) => {
      if (!process.env.PROFILE_BASE_URL) throw new Error();
      const newComment = JSON.parse(JSON.stringify(comment));
      newComment.user.profileImage = comment.user.profileImage
        ? process.env.PROFILE_BASE_URL + comment.user.profileImage
        : (newComment.user.profileImage = `${process.env.PROFILE_BASE_URL}${
            comment.user.userId % 5
          }.png`);
      return newComment;
    });
  }

  public async updateComment(userId: number, commentId: number, content: string) {
    const comment = await this.commentsRepository.findOneBy(commentId);
    if (!comment) throw badRequest('댓글이 존재하지 않음');

    if (comment.userId !== userId) throw unauthorized('유저 정보 불일치');

    await this.commentsRepository.updateOne(commentId, content);
  }

  public async deleteComment(userId: number, commentId: number) {
    const comment = await this.commentsRepository.findOneBy(commentId);
    if (!comment) throw badRequest('댓글이 존재하지 않음');

    if (comment.userId !== userId) throw unauthorized('유저 정보 불일치');

    await this.commentsRepository.deleteOne(commentId);
  }
}

export default CommentsService;
