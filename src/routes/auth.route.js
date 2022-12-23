const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');

const router = Router();
const authController = new AuthController();

module.exports = router;
