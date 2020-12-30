import { User } from './User';
import { UserName } from './UserName';
import { UserService } from './UserService';
import { IUserRepository } from './IUserRepository';

export class Program {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public createUser(name: string): void {
    const user = new User(new UserName(name));
    const userService = new UserService(this.userRepository);

    if (userService.exists(user)) {
      throw new Error('User already exists');
    }

    this.userRepository.save(user);
  }
}
