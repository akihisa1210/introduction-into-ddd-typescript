import 'reflect-metadata';
import { container } from 'tsyringe';

import { UserData } from 'Application/User/UserData';
import { UserUpdateCommand } from '../Application/User/UserUpdateCommand';
import { UserUpdateService } from '../Application/User/UserUpdateService';
import {
  UserGetInfoByUserName,
  UserGetInfoService,
} from 'Application/User/UserGetInfoService';

export const update = async (
  dstName: string,
  srcName: string,
): Promise<UserData> => {
  const userGetInfoService: UserGetInfoService = container.resolve(
    UserGetInfoService,
  );
  const userUpdateService: UserUpdateService = container.resolve(
    UserUpdateService,
  );

  const userGetInfoCommand: UserGetInfoByUserName = {
    target: 'userName',
    value: dstName,
  };
  const dstUser = await userGetInfoService.handle(userGetInfoCommand);

  const userUpdateCommand = new UserUpdateCommand(dstUser.id, srcName);

  return await userUpdateService.handle(userUpdateCommand);
};
