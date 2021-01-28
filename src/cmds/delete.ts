import { UserData } from 'Application/User/UserData';
import { UserGetInfoCommand } from 'Application/User/UserGetInfoCommand';
import { UserGetInfoService } from 'Application/User/UserGetInfoService';
import { UserDeleteCommand } from '../Application/User/UserDeleteCommand';
import { UserDeleteService } from '../Application/User/UserDeleteService';

import 'reflect-metadata';
import { container } from 'tsyringe';

export const deleteCmd = async (name: string): Promise<void> => {
  const userGetInfoService: UserGetInfoService = container.resolve(
    UserGetInfoService,
  );
  const userDeleteService: UserDeleteService = container.resolve(
    UserDeleteService,
  );

  const userGetInfoCommand: UserGetInfoCommand = {
    kind: 'userName',
    value: name,
  };
  const user = (await userGetInfoService.handle(
    userGetInfoCommand,
  )) as UserData;

  const userDeleteCommand = new UserDeleteCommand(user.id);

  await userDeleteService.handle(userDeleteCommand);
};
