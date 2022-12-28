import { Router } from 'express';
import LocalAuthController from '../controllers/local.auth.controller';
import KakaoAuthController from '../controllers/kakao.auth.controller';

import multeruploader from '../middlewares/multer.profile';
import * as auth from '../middlewares/auth.middleware';

const authRouter = Router();
const kakaoController = new KakaoAuthController();
const localController = new LocalAuthController();

authRouter.get('/login/kakao', auth.requireNoLogin, kakaoController.loginKakao);
authRouter.get('/login/kakao/final', auth.requireNoLogin, kakaoController.checkKakao);

authRouter.post(
  '/signup',
  auth.requireNoLogin,
  multeruploader.single('profileImage'),
  localController.localSignup
);
authRouter.post('/emailCheck', auth.requireNoLogin, localController.emailCheck);
authRouter.post('/login/local', auth.requireNoLogin, localController.login);

authRouter.post('/detail', localController.getUserDetail);
authRouter.patch('/detail/userName', auth.requireLogin, localController.updateUserName);
authRouter.patch(
  '/detail/profileImage',
  auth.requireLogin,
  multeruploader.single('profileImage'),
  localController.updateImage
);

export default authRouter;
