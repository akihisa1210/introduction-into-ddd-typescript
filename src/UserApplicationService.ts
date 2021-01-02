import { IUserRepository } from './IUserRepository';
import { User } from './User';
import { UserData } from './UserData';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserService } from './UserService';

export class UserApplicationService {
  private readonly userRepository: IUserRepository;
  private readonly userService: UserService;

  constructor(userRepository: IUserRepository, userService: UserService) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  register(name: string): void {
    const user = new User(new UserName(name));

    if (this.userService.exists(user)) {
      throw new Error('User already exists');
    }

    this.userRepository.save(user);
  }

  get(userId: string): UserData | null {
    const targetId = new UserId(userId);
    const user = this.userRepository.findById(targetId);

    if (user === null) {
      return null;
    }

    const userData = new UserData(user);

    return userData;
  }
}
