import { IUserRepository } from '../../Repository/User/IUserRepository';
import { UserId } from '../../UserId';
import { UserName } from '../../UserName';
import { UserService } from '../../UserService';
import { UserUpdateCommand } from '../../UserUpdateCommand';
import { injectable, inject } from 'tsyringe';

@injectable()
export class UserUpdateService {
  private readonly userRepository: IUserRepository;
  private readonly userService: UserService;

  constructor(
    @inject('IUserRepository') userRepository: IUserRepository,
    @inject('UserService') userService: UserService,
  ) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  async handle(command: UserUpdateCommand): Promise<void> {
    const targetId = new UserId(command.id);
    const user = await this.userRepository.findById(targetId);

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
