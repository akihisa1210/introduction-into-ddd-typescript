import 'reflect-metadata';
import { container } from 'tsyringe';

import { UserGetInfoService } from '../Application/User/UserGetInfoService';

export const find = async (id: string): Promise<void> => {
  console.log('---UserGetInfoService---');

  const userGetInfoService: UserGetInfoService = container.resolve(
    UserGetInfoService,
  );
  const userData = await userGetInfoService.handle(id);
  console.log(userData);
};
