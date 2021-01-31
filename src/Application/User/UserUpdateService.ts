import { IUserRepository } from '../../Repository/User/IUserRepository';
import { User } from '../../Domain/User/User';
import { UserId } from '../../Domain/User/UserId';
import { UserName } from '../../Domain/User/UserName';
import { UserService } from '../../Domain/User/UserService';
import { UserUpdateCommand } from './UserUpdateCommand';
import { injectable, inject } from 'tsyringe';
import { UserData } from './UserData';

@injectable()
export class UserUpdateService {
  private readonly userRepository: IUserRepository;
  private readonly userService: UserService;

  constructor(
    @inject('IUserRepository') userRepository: IUserRepository,
    userService: UserService,
  ) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  async handle(command: UserUpdateCommand): Promise<UserData> {
    const targetId = new UserId(command.id);
    const user = await this.userRepository.findById(targetId);

    if (user === null) {
      throw new Error('User not found');
    }

    const newName = command.name;

    if (newName === null) {
      throw new Error('New UserName is null');
    }

    const newUserName = new UserName(newName);

    if (await this.userService.exists(new User(newUserName, targetId))) {
      throw new Error('User already exists');
    }

    user.changeName(newUserName);

    await this.userRepository.save(user);

    return new UserData(user);
  }
}
