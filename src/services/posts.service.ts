import prisma from '../config/databases/prisma';
import PostsRepository from '../repositories/posts.repository';

class PostsService {
  postsRepository: PostsRepository;

  constructor() {
    this.postsRepository = new PostsRepository(prisma);
  }
}

export default PostsService;
