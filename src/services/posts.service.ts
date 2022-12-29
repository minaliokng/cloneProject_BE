import { badRequest, forbidden } from '@hapi/boom';
import PostsRepository from '../repositories/posts.repository';
import prisma from '../config/databases/prisma';
import PostsS3Repository from '../repositories/posts.s3.repository';
import s3 from '../config/AWS.s3';

class PostsService {
  postsRepository: PostsRepository;

  postsS3Repository: PostsS3Repository;

  constructor() {
    this.postsRepository = new PostsRepository(prisma);
    this.postsS3Repository = new PostsS3Repository(s3);
  }

  createPost = async (
    title: string,
    content: string,
    privateOption: number,
    userId: number,
    postImage?: string
  ) => {
    // const changedContent = content.replace(/(?:\r\n|\r|\n)/gi, '<br/>');
    await this.postsRepository.createPost(title, content, privateOption, userId, postImage);
  };

  getPostsOrderByTime = async () => {
    const posts = await this.postsRepository.getPostsOrderByTime();
    return posts.map((post) => {
      const newPost = JSON.parse(JSON.stringify(post));
      newPost.user.profileImage = (process.env.PROFILE_BASE_URL as string) + post.user.profileImage;
      return newPost;
    });
  };

  getPostsOrderByCount = async () => {
    const posts = await this.postsRepository.getPostsOrderByCount();
    return posts.map((post) => {
      const newPost = JSON.parse(JSON.stringify(post));
      newPost.user.profileImage = (process.env.PROFILE_BASE_URL as string) + post.user.profileImage;
      return newPost;
    });
  };

  getPost = async (postId: number) => {
    const post = await this.postsRepository.getPost(postId);

    if (!post) throw badRequest('존재하지 않는 게시글');
    post.user.profileImage = (process.env.PROFILE_BASE_URL as string) + post.user.profileImage;
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
    // const changedContent = content.replace(/\r\n|\r|\n/g, '<br />');
    await this.postsRepository.updatePost(postId, title, content, privateOption);
  };

  deletePost = async (userId: number, postId: number) => {
    const existPost = await this.postsRepository.findOneByPostId(postId);

    if (!existPost) throw badRequest('존재하지 않는 게시글');

    if (existPost.userId !== userId) throw forbidden('사용자 정보 불일치');

    if (existPost.postImage) {
      const imageKey = existPost.postImage.split('/')[existPost.postImage.split('/').length - 1];
      await this.postsRepository.deletePost(postId);
      await this.postsS3Repository.deleteS3Image(imageKey);
    } else {
      await this.postsRepository.deletePost(postId);
    }
  };

  deleteS3Image = async (imageKey: string) => {
    await this.postsS3Repository.deleteS3Image(imageKey);
  };
}

export default PostsService;
