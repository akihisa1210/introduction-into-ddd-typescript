import { IUserRepository } from '../../IUserRepository';
import { User } from '../../User';
import { UserName } from '../../UserName';
import { UserRegisterCommand } from '../../UserRegisterCommand';
import { UserService } from '../../UserService';
import { injectable, inject } from 'tsyringe';

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

  handle(command: UserRegisterCommand): void {
    const userName = new UserName(command.name);
    const user = new User(userName);

    if (this.userService.exists(user)) {
      throw new Error('User already exists');
    }

    this.userRepository.save(user);
  }
}
