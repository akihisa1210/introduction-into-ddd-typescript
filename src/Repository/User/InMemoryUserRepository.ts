import { IUserRepository } from './IUserRepository';
import { User } from '../../Domain/User/User';
import { UserId } from '../../Domain/User/UserId';
import { UserName } from '../../Domain/User/UserName';
import { injectable } from 'tsyringe';

@injectable()
export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  public save(user: User): void {
    console.log('users:', this.users);
    this.users.push(user);
    console.log('users:', this.users);
  }

  public async findById(id: UserId): Promise<User | null> {
    console.log(`finding user by id: ${id.value} for production!`);
    if (id.value === '2') {
      console.log('User found!');
      return new Promise((resolve) => {
        resolve(new User(new UserName('ExistingUser2')));
      });
    }
    console.log('User not found!');
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  public findByName(name: UserName): Promise<User | null> {
    console.log('users:', this.users);

    const target = this.users.find((user) => user.name.value === name.value);
    if (target !== undefined) {
      return new Promise((resolve) => resolve(target));
    }
    return new Promise((resolve) => resolve(null));
  }

  public findAll(): Promise<User[]> {
    console.log(`finding all users for production!`);
    return new Promise((resolve) => {
      resolve([
        new User(new UserName('User1')),
        new User(new UserName('User2')),
      ]);
    });
  }

  public delete(user: User): void {
    console.log(`Delete ${user.name} for production!`);
  }
}
