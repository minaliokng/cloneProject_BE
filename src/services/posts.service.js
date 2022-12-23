const PostsRepository = require('../repositories/Posts.repository');

class PostsService {
  constructor() {
    this.postsRepository = new PostsRepository();
  }
}

module.exports = PostsService;
