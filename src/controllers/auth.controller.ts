import axios from 'axios';
import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  loginKakao = (req: Request, res: Response) => {
    this.authService.loginKakao();

    const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
    const config = {
      client_id: '721a4dfb70a30313cd9576c7036193bf',
      redirect_uri: 'http://localhost:3000/user/login/kakao/final',
      response_type: 'code',
      // prompt: 'login',
    };
    const params = new URLSearchParams(config).toString();

    res.redirect(`${baseUrl}?${params}`);
  };

  checkKakao = async (req: Request, res: Response) => {
    this.authService.loginKakao();

    const { code } = req.query as { code: string };
    const config = {
      client_id: '721a4dfb70a30313cd9576c7036193bf',
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/user/login/kakao/final',
      code,
    };
    const params = new URLSearchParams(config).toString();
    const baseUrl = 'https://kauth.kakao.com/oauth/token';

    await axios({
      method: 'post',
      url: `${baseUrl}?${params}`,
      headers: {
        'Content-type': 'application/json',
      },
    });

    res.send('OK');
    // access_token, refresh_token -> res.data
  };
}

export default AuthController;
