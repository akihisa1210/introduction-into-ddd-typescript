import { UserGetInfoCommand } from 'Application/User/UserGetInfoCommand';
import 'reflect-metadata';
import { container } from 'tsyringe';

import { UserGetInfoService } from '../Application/User/UserGetInfoService';

export const find = async (id: string | undefined): Promise<void> => {
  const userGetInfoService: UserGetInfoService = container.resolve(
    UserGetInfoService,
  );

  if (id === undefined) {
    const userData = await userGetInfoService.handle();
    console.log(JSON.stringify(userData));
    return;
  }

  const userGetInfoCommand = new UserGetInfoCommand(id);
  const userData = await userGetInfoService.handle(userGetInfoCommand);
  console.log(JSON.stringify(userData));
  return;
};
