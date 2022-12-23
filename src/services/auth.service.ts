import * as bcrypt from 'bcrypt';
import AuthRepository from '../repositories/auth.repository';

class AuthService {
  authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  loginKakao = () => {
    this.authRepository.loginKakao();
  };
}

export default AuthService;
