import { Request, Response } from 'express';
import AuthService from '../services/kakao.auth.service';

class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
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

export default AuthController;
