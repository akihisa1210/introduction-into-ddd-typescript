import 'reflect-metadata';
import { container } from 'tsyringe';

import { UserRegisterCommand } from '../Application/User/UserRegisterCommand';
import { UserRegisterService } from '../Application/User/UserRegisterService';

export const add = async (name: string): Promise<void> => {
  console.log('---UserRegisterService---');

  const userRegisterService: UserRegisterService = container.resolve(
    UserRegisterService,
  );
  const userRegistercommand = new UserRegisterCommand(name);

  try {
    await userRegisterService.handle(userRegistercommand);
  } catch (error) {
    console.log(error);
  }
};
