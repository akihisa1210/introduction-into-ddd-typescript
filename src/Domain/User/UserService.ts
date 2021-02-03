import { User } from './User';
import { IUserRepository } from './IUserRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export class UserService {
  private userRepository: IUserRepository;

  constructor(@inject('IUserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async exists(user: User): Promise<boolean> {
    const found = await this.userRepository.findByName(user.name);
    return found !== null;
  }
}
