import { User } from './User';
import { IUserRepository } from './IUserRepository';

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public exists(user: User): boolean {
    const found = this.userRepository.findByName(user.name);
    return found != null;
  }
}
