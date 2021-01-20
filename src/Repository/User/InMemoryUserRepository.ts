import { IUserRepository } from './IUserRepository';
import { User } from '../../Domain/User/User';
import { UserId } from '../../Domain/User/UserId';
import { UserName } from '../../Domain/User/UserName';
import { injectable } from 'tsyringe';

@injectable()
export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  public save(user: User): Promise<void> {
    console.log('users:', this.users);
    this.users.push(user);
    console.log('users:', this.users);
    return new Promise((resolve) => resolve());
  }

  public async findById(id: UserId): Promise<User | null> {
    console.log('users:', this.users);

    const target = this.users.find((user) => user.id.value === id.value);
    if (target !== undefined) {
      return new Promise((resolve) => resolve(target));
    }
    return new Promise((resolve) => resolve(null));
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
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  public delete(user: User): Promise<void> {
    console.log('users:', this.users);

    const deleteTargetUser = this.users.find(
      (existingUser) => existingUser.id.value === user.id.value,
    );

    if (deleteTargetUser === undefined) {
      return new Promise((resolve) => resolve());
    }

    const newUsers = this.users.filter(
      (user) => user.id.value !== deleteTargetUser.id.value,
    );

    this.users = newUsers;

    return new Promise((resolve) => resolve());
  }
}
