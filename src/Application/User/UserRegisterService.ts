import { IUserRepository } from '../../Repository/User/IUserRepository';
import { User } from '../../Domain/User/User';
import { UserName } from '../../Domain/User/UserName';
import { UserRegisterCommand } from './UserRegisterCommand';
import { UserService } from '../../Domain/User/UserService';
import { injectable, inject } from 'tsyringe';
import { UserId } from 'Domain/User/UserId';

@injectable()
export class UserRegisterService {
  private readonly userRepository: IUserRepository;
  private readonly userService: UserService;

  constructor(
    @inject('IUserRepository') userRepository: IUserRepository,
    @inject('UserService') userService: UserService,
  ) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  async handle(command: UserRegisterCommand): Promise<void> {
    const userName = new UserName(command.name);
    let userId: UserId | undefined;
    if (command.id === undefined) {
      userId = undefined;
    } else {
      userId = new UserId(command.id);
    }
    const user = new User(userName, userId);

    if (await this.userService.exists(user)) {
      throw new Error('User already exists');
    }

    this.userRepository.save(user);
  }
}
