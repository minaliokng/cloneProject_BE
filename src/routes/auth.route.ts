import { Router } from 'express';
import AuthController from '../controllers/kakao.auth.controller';

const authRouter = Router();
const authController = new AuthController();

authRouter.get('/login/kakao', authController.loginKakao);
authRouter.get('/login/kakao/final', authController.checkKakao);

export default authRouter;
