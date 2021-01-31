import { UserRegisterCommand } from 'Application/User/UserRegisterCommand';
import { UserRegisterService } from 'Application/User/UserRegisterService';
import { Circle, CircleName } from 'Domain/Circle/Circle';
import { ICircleRepository } from 'Repository/Circle/ICircleRepository';
import { container } from 'tsyringe';
import { CircleCreateCommand } from '../CircleCreateCommand';
import { CircleCreateService } from '../CircleCreateService';
import { CircleJoinCommand } from '../CircleJoinCommand';
import { CircleJoinService } from '../CircleJoinService';
import assert = require('assert');

beforeEach(() => {
  container.clearInstances();
});

describe('CircleJoinService', () => {
  it('handle makes user to join a circle', async () => {
    const circleRepository: ICircleRepository = container.resolve(
      'ICircleRepository',
    );
    const circleJoinService = container.resolve(CircleJoinService);
    const circleCreateService = container.resolve(CircleCreateService);
    const userRegisterService = container.resolve(UserRegisterService);

    const user1Data = await userRegisterService.handle(
      new UserRegisterCommand('user1'),
    );
    const user2Data = await userRegisterService.handle(
      new UserRegisterCommand('user2'),
    );

    const circle1Data = await circleCreateService.handle(
      new CircleCreateCommand('circle1', user1Data.id),
    );

    await circleJoinService.handle(
      new CircleJoinCommand(circle1Data.id, user2Data.id),
    );

    const circle = await circleRepository.findByName(new CircleName('circle1'));

    expect(circle?.members.length).toEqual(1);
    expect(circle?.members[0].name.value).toEqual('user2');
  });

  it('handle return error if circle has 29 members.', async () => {
    const circleRepository: ICircleRepository = container.resolve(
      'ICircleRepository',
    );
    const circleJoinService = container.resolve(CircleJoinService);
    const circleCreateService = container.resolve(CircleCreateService);
    const userRegisterService = container.resolve(UserRegisterService);

    const ownerData = await userRegisterService.handle(
      new UserRegisterCommand('owner'),
    );

    const circle1Data = await circleCreateService.handle(
      new CircleCreateCommand('circle1', ownerData.id),
    );

    const circle = await circleRepository.findByName(new CircleName('circle1'));

    assert(circle);

    // make 29 members join Circle
    const existingMembers = [...Array(29).keys()].map(
      async (i) => await createUserAndJoinUserToCircle(`user${i}`, circle),
    );
    Promise.all(existingMembers);

    const newUserData = await userRegisterService.handle(
      new UserRegisterCommand('newUser'),
    );

    await expect(
      circleJoinService.handle(
        new CircleJoinCommand(circle1Data.id, newUserData.id),
      ),
    ).rejects.toThrow('Circle members are more than 29.');

    expect(circle.members.length).toEqual(29);
  });
});

const createUserAndJoinUserToCircle = async (
  userName: string,
  circle: Circle,
) => {
  const userRegisterService = container.resolve(UserRegisterService);
  const circleJoinService = container.resolve(CircleJoinService);

  const userData = await userRegisterService.handle(
    new UserRegisterCommand(userName),
  );
  await circleJoinService.handle(
    new CircleJoinCommand(circle.id.value, userData.id),
  );
};
