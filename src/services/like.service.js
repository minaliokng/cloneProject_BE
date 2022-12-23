const LikeRepository = require('../repositories/Like.repository');

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
}

module.exports = LikeService;
