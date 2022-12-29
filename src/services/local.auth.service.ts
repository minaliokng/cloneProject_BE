import { badRequest } from '@hapi/boom';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import LocalAuthRepository from '../repositories/local.auth.repository';
import { signupPattern, loginPattern, namePattern } from '../validation/local.auth.validation';
import { deleteS3Image } from '../middlewares/multer.profile';

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

  localSignup = async (userData: any, image?: string) => {
    const { email, userName, password } = await signupPattern.validateAsync(userData);

    const emailCheck = await this.emailCheck(email);
    if (emailCheck) throw badRequest('사용 중인 이메일');

    const hash = await bcrypt.hash(password, Number(salt));
    let fileName;
    if (image) fileName = image.split('/')[4];
    await this.localAuthRepository.createUser(email, userName, hash, fileName);
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
          profileImage: `${process.env.PROFILE_BASE_URL}${user.profileImage}`,
          token,
        };
      }
    }

    throw badRequest('이메일 또는 비밀번호 불일치');
  };

  getUserDetail = async (userId: number) => {
    const userData = await this.localAuthRepository.userIdCheck(userId);

    if (!userData) throw badRequest('해당 사용자 없음');
    else {
      userData.profileImage = `${process.env.PROFILE_BASE_URL}${userData?.profileImage}`;
      return userData;
    }
  };

  updateUserName = async (userData: any) => {
    const { userId, userName } = userData as { userId: number; userName: string };
    await namePattern.validateAsync(userName);

    await this.localAuthRepository.updateName(userId, userName);
    return userName;
  };

  updateImage = async (userData: any, profileImage: string) => {
    const { userId, imageUrl } = userData as { userId: number; imageUrl?: string };
    const fileName = profileImage.split('/')[4];
    const deleteImage = imageUrl?.split('/')[4];
    await this.localAuthRepository.updateImage(Number(userId), fileName);

    if (deleteImage) deleteS3Image(deleteImage);

    return profileImage;
  };
}

export default LocalAuthService;
