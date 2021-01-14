import 'reflect-metadata';
import { container } from 'tsyringe';

import { UserUpdateCommand } from '../Application/User/UserUpdateCommand';
import { UserUpdateService } from '../Application/User/UserUpdateService';

export const update = async (id: string, name: string): Promise<void> => {
  console.log('---UserUpdateService---');

  const userUpdateService: UserUpdateService = container.resolve(
    UserUpdateService,
  );
  const userUpdateCommand = new UserUpdateCommand(id, name);

  try {
    await userUpdateService.handle(userUpdateCommand);
  } catch (error) {
    console.log(error);
  }
};
