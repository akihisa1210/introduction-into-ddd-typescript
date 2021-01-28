import { IUserRepository } from '../../Repository/User/IUserRepository';
import { UserData } from './UserData';
import { UserId } from '../../Domain/User/UserId';
import { injectable, inject } from 'tsyringe';
import { UserName } from 'Domain/User/UserName';
import { UserGetInfoCommand } from './UserGetInfoCommand';

@injectable()
export class UserGetInfoService {
  private readonly userRepository: IUserRepository;

  constructor(@inject('IUserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async handle(
    userGetInfoComand?: UserGetInfoCommand,
  ): Promise<UserData[] | UserData | null> {
    if (userGetInfoComand === undefined) {
      const users = await this.userRepository.findAll();

      const usersData = [];

      for (const user of users) {
        usersData.push(new UserData(user));
      }

      return usersData;
    }

    switch (userGetInfoComand.kind) {
      case 'userId': {
        const targetId = new UserId(userGetInfoComand.value);
        const user = await this.userRepository.findById(targetId);
        if (user === null) {
          return null;
        }

        const userData = new UserData(user);

        return userData;
      }
      case 'userName': {
        const targetName = new UserName(userGetInfoComand.value);
        const user = await this.userRepository.findByName(targetName);
        if (user === null) {
          return null;
        }

        const userData = new UserData(user);

        return userData;
      }

      default:
        throw new Error('userId of userName must be specified.');
    }
  }
}
