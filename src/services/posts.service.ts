import { badRequest, forbidden } from '@hapi/boom';
import PostsRepository from '../repositories/posts.repository';
import prisma from '../config/databases/prisma';

class PostsService {
  postsRepository: PostsRepository;

  constructor() {
    this.postsRepository = new PostsRepository(prisma);
  }

  createPost = async (title: string, content: string, privateOption: number, userId: number) => {
    await this.postsRepository.createPost(title, content, privateOption, userId);
  };

  getPosts = async () => {
    const posts = await this.postsRepository.getPosts();
    return posts;
  };

  getPost = async (postId: number) => {
    const post = await this.postsRepository.getPost(postId);

    if (!post) throw badRequest('존재하지 않는 게시글');

    return post;
  };

  getWrittenPost = async (postId: number, userId: number) => {
    const writtenPost = await this.postsRepository.getWrittenPost(postId);

    if (!writtenPost) throw badRequest('존재하지 않는 게시글');

    if (writtenPost.userId !== userId) throw forbidden('사용자 정보 불일치');

    return writtenPost;
  };

  updatePost = async (
    title: string,
    content: string,
    privateOption: number,
    userId: number,
    postId: number
  ) => {
    const existPost = await this.postsRepository.findOneByPostId(postId);

    if (!existPost) throw badRequest('존재하지 않는 게시글');

    if (existPost.userId !== userId) throw forbidden('사용자 정보 불일치');

    await this.postsRepository.updatePost(postId, title, content, privateOption);
  };

  deletePost = async (userId: number, postId: number) => {
    const existPost = await this.postsRepository.findOneByPostId(postId);

    if (!existPost) throw badRequest('존재하지 않는 게시글');

    if (existPost.userId !== userId) throw forbidden('사용자 정보 불일치');

    await this.postsRepository.deletePost(postId);
  };
}

export default PostsService;
