import {
  UserGetInfoByUserName,
  UserGetInfoService,
} from 'Application/User/UserGetInfoService';
import { UserDeleteCommand } from '../Application/User/UserDeleteCommand';
import { UserDeleteService } from '../Application/User/UserDeleteService';
import 'reflect-metadata';
import { container } from 'tsyringe';

export const deleteUser = async (name: string): Promise<void> => {
  const userGetInfoService: UserGetInfoService = container.resolve(
    UserGetInfoService,
  );
  const userDeleteService: UserDeleteService = container.resolve(
    UserDeleteService,
  );

  const userGetInfoCommand: UserGetInfoByUserName = {
    target: 'userName',
    value: name,
  };
  const user = await userGetInfoService.handle(userGetInfoCommand);

  const userDeleteCommand = new UserDeleteCommand(user.id);

  await userDeleteService.handle(userDeleteCommand);
};

export const deleteCmd = async (name: string): Promise<void> => {
  await deleteUser(name);
};
