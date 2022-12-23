const CommentsRepository = require('../repositories/Comments.repository');

class CommentsService {
  constructor() {
    this.commentsRepository = new CommentsRepository();
  }
}

module.exports = CommentsService;
