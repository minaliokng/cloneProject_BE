import { PrismaMySqlRepository } from '../modules/repository.module';

class UsersRepository extends PrismaMySqlRepository {
  public async findOneByUserId(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    return user;
  }
}

export default UsersRepository;
