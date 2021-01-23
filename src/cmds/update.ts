import 'reflect-metadata';
import { container } from 'tsyringe';

import { UserUpdateCommand } from '../Application/User/UserUpdateCommand';
import { UserUpdateService } from '../Application/User/UserUpdateService';

export const update = async (id: string, name: string): Promise<void> => {
  const userUpdateService: UserUpdateService = container.resolve(
    UserUpdateService,
  );
  const userUpdateCommand = new UserUpdateCommand(id, name);

  await userUpdateService.handle(userUpdateCommand);
};
