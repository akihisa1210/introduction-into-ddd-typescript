import { IUserRepository } from './IUserRepository';
import { User } from './User';
// import { UserId } from './UserId';
import { UserName } from './UserName';

export class InMemoryUserRepository implements IUserRepository {
  public save(user: User): void {
    console.log(`Save ${user.name.name}`);
  }

  public find(name: UserName): User | null {
    console.log(`finding user: ${name.name}`);
    return null;
  }
}
