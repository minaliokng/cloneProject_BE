import { PrismaClient } from '@prisma/client';
import { S3 } from '@aws-sdk/client-s3';

class LocalAuthRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  emailCheck = async (email: string) => {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  };

  userIdCheck = async (userId: number) => {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      select: {
        email: true,
        userName: true,
        profileImage: true,
      },
    });

    return user;
  };

  createUser = async (email: string, userName: string, password: string, profileImage?: string) => {
    await this.prisma.user.create({
      data: {
        email,
        userName,
        password,
        profileImage,
      },
    });
  };

  checkUser = async (email: string, password: string) => {
    const [user] = await this.prisma.user.findMany({
      where: {
        email,
        password,
      },
    });

    return user;
  };

  updateName = async (userId: number, userName: string) => {
    const user = await this.prisma.user.update({
      where: { userId },
      data: { userName },
    });

    return user;
  };

  updateImage = async (userId: number, profileImage: string) => {
    const user = await this.prisma.user.update({
      where: { userId },
      data: { profileImage },
    });

    return user;
  };
}

export default LocalAuthRepository;
