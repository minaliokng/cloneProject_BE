import { Request, Response } from 'express';
import KakaoAuthService from '../services/kakao.auth.service';

class KakaoAuthController {
  authService: KakaoAuthService;

  constructor() {
    this.authService = new KakaoAuthService();
  }

  loginKakao = (req: Request, res: Response) => {
    res.redirect(this.authService.loginKakao());
  };

  checkKakao = async (req: Request, res: Response) => {
    const { code } = req.query as { code: string };

    const result = await this.authService.checkKakao(code);
    res.status(200).json(result);
  };
}

export default KakaoAuthController;
