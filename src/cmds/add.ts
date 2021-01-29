import 'reflect-metadata';
import { container } from 'tsyringe';

import { UserRegisterCommand } from '../Application/User/UserRegisterCommand';
import { UserRegisterService } from '../Application/User/UserRegisterService';

export const add = async (name: string): Promise<void> => {
  const userRegisterService: UserRegisterService = container.resolve(
    UserRegisterService,
  );
  const userRegistercommand = new UserRegisterCommand(name);

  const userData = await userRegisterService.handle(userRegistercommand);

  console.log(JSON.stringify(userData));
};
