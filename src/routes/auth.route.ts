import { Router } from 'express';
import LocalAuthController from '../controllers/local.auth.controller';
import KakaoAuthController from '../controllers/kakao.auth.controller';

import multeruploader from '../middlewares/multer.profile';

const authRouter = Router();
const kakaoController = new KakaoAuthController();
const localController = new LocalAuthController();

authRouter.get('/login/kakao', kakaoController.loginKakao);
authRouter.get('/login/kakao/final', kakaoController.checkKakao);

authRouter.post('/signup', multeruploader.single('profileImage'), localController.localSignup);
authRouter.post('/emailCheck', localController.emailCheck);
authRouter.post('/login/local', localController.login);

export default authRouter;
