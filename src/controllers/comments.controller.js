const CommentsService = require('../services/comments.service');

class CommentsController {
  constructor() {
    this.commentsService = new CommentsService();
  }
}

module.exports = CommentsController;
