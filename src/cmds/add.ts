import { UserData } from 'Application/User/UserData';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserRegisterCommand } from '../Application/User/UserRegisterCommand';
import { UserRegisterService } from '../Application/User/UserRegisterService';

export const addUser = async (name: string): Promise<UserData> => {
  const userRegisterService: UserRegisterService = container.resolve(
    UserRegisterService,
  );
  const userRegistercommand = new UserRegisterCommand(name);

  return await userRegisterService.handle(userRegistercommand);
};

export const add = async (name: string): Promise<void> => {
  const result = await addUser(name);
  console.log(JSON.stringify(result));
};
