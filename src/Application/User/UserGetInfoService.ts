import { IUserRepository } from '../../Repository/User/IUserRepository';
import { UserData } from '../../UserData';
import { UserId } from '../../UserId';
import { injectable, inject } from 'tsyringe';

@injectable()
export class UserGetInfoService {
  private readonly userRepository: IUserRepository;

  constructor(@inject('IUserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  handle(userId: string): UserData | null {
    const targetId = new UserId(userId);
    const user = this.userRepository.findById(targetId);

    if (user === null) {
      return null;
    }

    const userData = new UserData(user);

    return userData;
  }
}
