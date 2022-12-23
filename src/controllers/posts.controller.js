const PostsService = require('../services/posts.service');

class PostsController {
  constructor() {
    this.postsService = new PostsService();
  }
}

module.exports = PostsController;
