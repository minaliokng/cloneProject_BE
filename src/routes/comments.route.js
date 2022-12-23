const { Router } = require('express');
const CommentsController = require('../controllers/comments.controller');

const router = Router();
const commentsController = new CommentsController();

module.exports = router;
