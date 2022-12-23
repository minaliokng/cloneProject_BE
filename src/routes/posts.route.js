const { Router } = require('express');
const PostsController = require('../controllers/posts.controller');

const router = Router();
const postsController = new PostsController();

module.exports = router;
