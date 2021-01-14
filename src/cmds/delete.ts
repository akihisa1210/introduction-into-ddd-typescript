import 'reflect-metadata';
import { container } from 'tsyringe';

import { UserDeleteCommand } from '../Application/User/UserDeleteCommand';
import { UserDeleteService } from '../Application/User/UserDeleteService';

export const deleteCmd = async (id: string): Promise<void> => {
  console.log('---UserDeleteService---');

  const userDeleteService: UserDeleteService = container.resolve(
    UserDeleteService,
  );
  const userDeleteCommand = new UserDeleteCommand(id);

  try {
    await userDeleteService.handle(userDeleteCommand);
  } catch (error) {
    console.log(error);
  }
};
