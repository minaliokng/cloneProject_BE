const { Router } = require('express');
const LikeController = require('../controllers/like.controller');

const router = Router();
const likeController = new LikeController();

module.exports = router;
