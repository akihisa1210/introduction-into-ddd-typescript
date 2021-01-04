import { IUserRepository } from './IUserRepository';
import { User } from './User';
import { UserData } from './UserData';
import { UserDeleteCommand } from './UserDeleteCommand';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserService } from './UserService';
import { UserUpdateCommand } from './UserUpdateCommand';

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

  update(command: UserUpdateCommand): void {
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

  delete(command: UserDeleteCommand): void {
    const targetId = new UserId(command.id);
    const user = this.userRepository.findById(targetId);

    if (user === null) {
      throw new Error('User not found');
    }

    this.userRepository.delete(user);
  }
}
