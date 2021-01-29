import 'reflect-metadata';
import { container } from 'tsyringe';

import {
  UserGetInfoByUserName,
  UserGetInfoService,
} from '../Application/User/UserGetInfoService';

export const find = async (name: string | undefined): Promise<void> => {
  const userGetInfoService: UserGetInfoService = container.resolve(
    UserGetInfoService,
  );

  if (name === undefined) {
    const userData = await userGetInfoService.handle({
      target: 'all',
      value: '',
    });
    console.log(JSON.stringify(userData));
    return;
  }

  const userGetInfoByUserName: UserGetInfoByUserName = {
    target: 'userName',
    value: name,
  };

  const userData = await userGetInfoService.handle(userGetInfoByUserName);
  console.log(JSON.stringify(userData));
  return;
};
