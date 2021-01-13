import { IUserRepository } from '../../Repository/User/IUserRepository';
import { UserData } from './UserData';
import { UserId } from '../../Domain/User/UserId';
import { injectable, inject } from 'tsyringe';

@injectable()
export class UserGetInfoService {
  private readonly userRepository: IUserRepository;

  constructor(@inject('IUserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async handle(userId?: string): Promise<UserData[] | UserData | null> {
    if (userId === undefined) {
      const users = await this.userRepository.findAll();

      const usersData = [];

      for (const user of users) {
        usersData.push(new UserData(user));
      }

      return usersData;
    } else {
      const targetId = new UserId(userId);
      const user = await this.userRepository.findById(targetId);

      if (user === null) {
        return null;
      }

      const userData = new UserData(user);

      return userData;
    }
  }
}
