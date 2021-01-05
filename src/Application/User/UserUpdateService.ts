import { IUserRepository } from '../../IUserRepository';
import { UserId } from '../../UserId';
import { UserName } from '../../UserName';
import { UserService } from '../../UserService';
import { UserUpdateCommand } from '../../UserUpdateCommand';

export class UserUpdateService {
  private readonly userRepository: IUserRepository;
  private readonly userService: UserService;

  constructor(userRepository: IUserRepository, userService: UserService) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  handle(command: UserUpdateCommand): void {
    const targetId = new UserId(command.id);
    const user = this.userRepository.findById(targetId);

    if (user === null) {
      throw new Error('User not found');
    }

    const name = command.name;
    if (name !== null) {
      const newUserName = new UserName(name);
      user.changeName(newUserName);
      if (this.userService.exists(user)) {
        throw new Error('User already exists');
      }
    }

    this.userRepository.save(user);
  }
}
