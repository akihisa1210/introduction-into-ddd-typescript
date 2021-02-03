import { IUserRepository } from '../../Domain/User/IUserRepository';
import { UserName } from '../../Domain/User/UserName';
import { UserRegisterCommand } from './UserRegisterCommand';
import { UserService } from '../../Domain/User/UserService';
import { injectable, inject } from 'tsyringe';
import { IUserFactory } from 'Domain/User/IUserFactory';
import { UserData } from './UserData';

@injectable()
export class UserRegisterService {
  private readonly userFactory: IUserFactory;
  private readonly userRepository: IUserRepository;
  private readonly userService: UserService;

  constructor(
    @inject('IUserFactory') userFactory: IUserFactory,
    @inject('IUserRepository') userRepository: IUserRepository,
    userService: UserService,
  ) {
    this.userFactory = userFactory;
    this.userRepository = userRepository;
    this.userService = userService;
  }

  async handle(command: UserRegisterCommand): Promise<UserData> {
    const userName = new UserName(command.name);
    const user = this.userFactory.create(userName);

    if (await this.userService.exists(user)) {
      throw new Error('User already exists');
    }

    this.userRepository.save(user);
    return new UserData(user);
  }
}
