import { IUserRepository } from '../../Repository/User/IUserRepository';
import { UserName } from '../../Domain/User/UserName';
import { UserRegisterCommand } from './UserRegisterCommand';
import { UserService } from '../../Domain/User/UserService';
import { injectable, inject } from 'tsyringe';
import { IUserFactory } from 'Domain/User/IUserFactory';

@injectable()
export class UserRegisterService {
  private readonly userFactory: IUserFactory;
  private readonly userRepository: IUserRepository;
  private readonly userService: UserService;

  constructor(
    @inject('IUserFactory') userFactory: IUserFactory,
    @inject('IUserRepository') userRepository: IUserRepository,
    @inject('UserService') userService: UserService,
  ) {
    this.userFactory = userFactory;
    this.userRepository = userRepository;
    this.userService = userService;
  }

  async handle(command: UserRegisterCommand): Promise<void> {
    const userName = new UserName(command.name);
    const user = this.userFactory.create(userName);

    if (await this.userService.exists(user)) {
      throw new Error('User already exists');
    }

    this.userRepository.save(user);
  }
}
