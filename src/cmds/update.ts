import 'reflect-metadata';
import { container } from 'tsyringe';

import { UserData } from 'Application/User/UserData';
import { UserUpdateCommand } from '../Application/User/UserUpdateCommand';
import { UserUpdateService } from '../Application/User/UserUpdateService';

export const update = async (id: string, name: string): Promise<UserData> => {
  const userUpdateService: UserUpdateService = container.resolve(
    UserUpdateService,
  );
  const userUpdateCommand = new UserUpdateCommand(id, name);

  return await userUpdateService.handle(userUpdateCommand);
};
