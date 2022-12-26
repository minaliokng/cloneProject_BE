import { PrismaClient } from '@prisma/client';

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

  createUser = async (email: string, userName: string, password: string) => {
    await this.prisma.user.create({
      data: {
        email,
        userName,
        password,
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
}

export default LocalAuthRepository;
