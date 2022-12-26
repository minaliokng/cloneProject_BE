import { badRequest } from '@hapi/boom';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import LocalAuthRepository from '../repositories/local.auth.repository';
import { signupPattern, loginPattern } from '../validation/local.auth.validation';

const { JWT_SECRET_KEY } = process.env as { JWT_SECRET_KEY: string };
const { salt } = process.env as { salt: string };

class LocalAuthService {
  localAuthRepository: LocalAuthRepository;

  constructor() {
    this.localAuthRepository = new LocalAuthRepository();
  }

  emailCheck = async (email: string) => {
    const check = await this.localAuthRepository.emailCheck(email);

    return check;
  };

  localSignup = async (userData: any) => {
    const { email, userName, password } = await signupPattern.validateAsync(userData);

    const emailCheck = await this.emailCheck(email);
    if (emailCheck) throw badRequest('사용 중인 이메일');

    const hash = await bcrypt.hash(password, Number(salt));
    await this.localAuthRepository.createUser(email, userName, hash);
  };

  login = async (userData: any) => {
    const { email, password } = await loginPattern.validateAsync(userData);

    const user = await this.localAuthRepository.emailCheck(email);
    if (user?.password) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = await jwt.sign(
          { userId: user.userId, userName: user.userName },
          JWT_SECRET_KEY,
          {
            expiresIn: '2h',
          }
        );

        return {
          userId: user.userId,
          userName: user.userName,
          profileImage: user.profileImage,
          token,
        };
      }
    }

    throw badRequest('이메일 또는 비밀번호 불일치');
  };
}

export default LocalAuthService;
