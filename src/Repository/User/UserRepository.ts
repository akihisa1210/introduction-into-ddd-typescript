import { IUserRepository } from './IUserRepository';
import { User } from '../../Domain/User/User';
import { UserId } from '../../Domain/User/UserId';
import { UserName } from '../../Domain/User/UserName';
import { injectable } from 'tsyringe';

import { MongoClient } from 'mongodb';

const MONGODDB_URI =
  'mongodb://root:example@mongo:27017/example?authSource=admin';

@injectable()
export class UserRepository implements IUserRepository {
  public async save(user: User): Promise<void> {
    const client = await MongoClient.connect(MONGODDB_URI, {
      useUnifiedTopology: true,
    });

    const filterQuery = {
      id: user.id.value,
    };

    const updateQuery = {
      $set: { id: user.id.value, name: user.name.value },
    };

    await client
      .db('app')
      .collection('users')
      .updateOne(filterQuery, updateQuery, { upsert: true });

    await client.close();
  }

  public async findById(id: UserId): Promise<User | null> {
    const client = await MongoClient.connect(MONGODDB_URI, {
      useUnifiedTopology: true,
    });

    const docs = await client
      .db('app')
      .collection('users')
      .find({ id: id.value })
      .toArray();

    await client.close();

    if (docs.length === 0) {
      console.log('User not found!');
      return new Promise((resolve) => {
        resolve(null);
      });
    }

    const foundId = docs[0].id;
    const foundName = docs[0].name;

    return new Promise((resolve) => {
      resolve(new User(new UserName(foundName), new UserId(foundId)));
    });
  }

  public async findByName(name: UserName): Promise<User | null> {
    const client = await MongoClient.connect(MONGODDB_URI, {
      useUnifiedTopology: true,
    });

    const docs = await client
      .db('app')
      .collection('users')
      .find({ name: name.value })
      .toArray();

    await client.close();

    if (docs.length === 0) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }

    const foundId = docs[0].id;
    const foundName = docs[0].name;

    return new Promise((resolve) => {
      resolve(new User(new UserName(foundName), new UserId(foundId)));
    });
  }

  public async findAll(): Promise<User[]> {
    const client = await MongoClient.connect(MONGODDB_URI, {
      useUnifiedTopology: true,
    });

    const docs = await client.db('app').collection('users').find({}).toArray();

    await client.close();

    const users: User[] = [];

    for (const doc of docs) {
      users.push(new User(new UserName(doc.name), new UserId(doc.id)));
    }
    return new Promise((resolve) => {
      resolve(users);
    });
  }

  public async delete(user: User): Promise<void> {
    const client = await MongoClient.connect(MONGODDB_URI, {
      useUnifiedTopology: true,
    });

    await client.db('app').collection('users').deleteOne({ id: user.id.value });

    await client.close();
  }
}
