import { Router } from 'express';
import multer from 'multer';
import LocalAuthController from '../controllers/local.auth.controller';
import KakaoAuthController from '../controllers/kakao.auth.controller';

const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

const authRouter = Router();
const kakaoController = new KakaoAuthController();
const localController = new LocalAuthController();

authRouter.get('/login/kakao', kakaoController.loginKakao);
authRouter.get('/login/kakao/final', kakaoController.checkKakao);

authRouter.post('/signup', upload.single('image'), localController.localSignup);
authRouter.post('/emailCheck', localController.emailCheck);
authRouter.post('/login/local', localController.login);

export default authRouter;
