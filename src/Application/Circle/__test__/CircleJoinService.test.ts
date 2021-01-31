import { UserRegisterCommand } from 'Application/User/UserRegisterCommand';
import { UserRegisterService } from 'Application/User/UserRegisterService';
import { CircleName } from 'Domain/Circle/Circle';
import { ICircleRepository } from 'Repository/Circle/ICircleRepository';
import { container } from 'tsyringe';
import { CircleCreateCommand } from '../CircleCreateCommand';
import { CircleCreateService } from '../CircleCreateService';
import { CircleJoinCommand } from '../CircleJoinCommand';
import { CircleJoinService } from '../CircleJoinService';

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

    expect(circle?.members[0].name.value).toEqual('user2');
  });
});
