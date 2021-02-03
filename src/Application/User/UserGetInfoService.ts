import { IUserRepository } from 'Domain/User/IUserRepository';
import { UserData } from './UserData';
import { UserId } from '../../Domain/User/UserId';
import { injectable, inject } from 'tsyringe';
import { UserName } from 'Domain/User/UserName';

export type UserGetInfoAll = {
  target: 'all';
  value: string;
};

export type UserGetInfoByUserId = {
  target: 'userId';
  value: string;
};

export type UserGetInfoByUserName = {
  target: 'userName';
  value: string;
};

type ArgumentTypeName =
  | UserGetInfoAll
  | UserGetInfoByUserId
  | UserGetInfoByUserName;

type returnType<T> = T extends UserGetInfoAll
  ? UserData[]
  : T extends UserGetInfoByUserId | UserGetInfoByUserName
  ? UserData
  : never;

@injectable()
export class UserGetInfoService {
  private readonly userRepository: IUserRepository;

  constructor(@inject('IUserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async handle<T extends ArgumentTypeName>(type: T): Promise<returnType<T>> {
    switch (type.target) {
      case 'all': {
        const users = await this.userRepository.findAll();

        const usersData = [];

        for (const user of users) {
          usersData.push(new UserData(user));
        }

        return usersData as returnType<T>;
      }
      case 'userId': {
        const targetId = new UserId(type.value);
        const user = await this.userRepository.findById(targetId);
        if (user === null) {
          throw new Error('User not found.');
        }

        const userData = new UserData(user);

        return userData as returnType<T>;
      }
      case 'userName': {
        const targetName = new UserName(type.value);
        const user = await this.userRepository.findByName(targetName);
        if (user === null) {
          throw new Error('User not found.');
        }

        const userData = new UserData(user);

        return userData as returnType<T>;
      }
      default:
        throw new Error('Invalid target.');
    }
  }
}
