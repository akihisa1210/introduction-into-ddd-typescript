import { UserData } from 'Application/User/UserData';
import 'reflect-metadata';
import { container } from 'tsyringe';
import {
  UserGetInfoByUserName,
  UserGetInfoService,
} from '../Application/User/UserGetInfoService';

export const findAllUsers = async (): Promise<UserData[]> => {
  const userGetInfoService: UserGetInfoService = container.resolve(
    UserGetInfoService,
  );
  const usersData = await userGetInfoService.handle({
    target: 'all',
    value: '',
  });
  return usersData;
};

export const findUser = async (name: string): Promise<UserData> => {
  const userGetInfoService: UserGetInfoService = container.resolve(
    UserGetInfoService,
  );

  const userGetInfoByUserName: UserGetInfoByUserName = {
    target: 'userName',
    value: name,
  };

  const userData = await userGetInfoService.handle(userGetInfoByUserName);
  return userData;
};

export const find = async (name: string | undefined): Promise<void> => {
  if (name === undefined) {
    const result = await findAllUsers();
    console.log(JSON.stringify(result));
  } else {
    const result = await findUser(name);
    console.log(JSON.stringify(result));
  }
};
