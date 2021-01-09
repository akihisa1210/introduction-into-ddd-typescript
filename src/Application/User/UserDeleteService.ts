import { IUserRepository } from '../../Repository/User/IUserRepository';
import { UserDeleteCommand } from '../../UserDeleteCommand';
import { UserId } from '../../UserId';
import { injectable, inject } from 'tsyringe';

@injectable()
export class UserDeleteService {
  private readonly userRepository: IUserRepository;

  constructor(@inject('IUserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async handle(command: UserDeleteCommand): Promise<void> {
    const userId = new UserId(command.id);
    const user = await this.userRepository.findById(userId);

    if (user === null) {
      throw new Error('User not found');
    }

    this.userRepository.delete(user);
  }
}
