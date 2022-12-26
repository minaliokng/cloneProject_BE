import { PrismaClient } from '@prisma/client';

class KakaoAuthRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  loginKakao = async () => { };

  checkIsUser = async (kakaoId: number) => {
    const [isUser] = await this.prisma.user.findMany({
      where: { snsId: kakaoId },
    });
    return isUser;
  };

  registerUser = async (snsId: number, userName: string, profileImage: string, token: string) => {
    const newUser = await this.prisma.user.create({
      data: {
        snsId,
        userName,
        profileImage,
      },
    });
    await this.prisma.token.create({
      data: {
        userId: newUser.userId,
        token,
      },
    });

    return newUser;
  };
}

export default KakaoAuthRepository;
