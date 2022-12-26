import axios from 'axios';
import jwt from 'jsonwebtoken';
import AuthRepository from '../repositories/kakao.auth.repository';

const { REST_API_KEY, REDIRECT_URI, JWT_SECRET_KEY } = process.env as {
  REST_API_KEY: string;
  REDIRECT_URI: string;
  JWT_SECRET_KEY: string;
};

class KakaoAuthService {
  authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  loginKakao = () => {
    this.authRepository.loginKakao();

    const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
    const config = {
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      // prompt: 'login',
    };
    const params = new URLSearchParams(config).toString();

    return `${baseUrl}?${params}`;
  };

  checkKakao = async (code: string) => {
    const config = {
      client_id: REST_API_KEY,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code,
    };
    const params = new URLSearchParams(config).toString();
    const baseUrl = 'https://kauth.kakao.com/oauth/token';

    const result = await axios({
      method: 'post',
      url: `${baseUrl}?${params}`,
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response) => {
      return response.data;
    });

    const { data } = await axios({
      method: 'get',
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        Authorization: `Bearer ${result.access_token}`,
      },
    });

    let isUser = await this.authRepository.checkIsUser(data.id);
    if (!isUser) {
      isUser = await this.authRepository.registerUser(
        data.id,
        data.properties.nickname,
        data.properties.profile_image,
        result.refresh_token
      );
    }

    const token = jwt.sign({ userId: isUser.userId, userName: isUser.userName }, JWT_SECRET_KEY, {
      expiresIn: '2h',
    });

    return {
      userid: isUser.userId,
      userName: isUser.userName,
      profileImage: isUser.profileImage,
      token,
    };
  };
}
export default KakaoAuthService;
