import { UserRegisterCommand } from 'Application/User/UserRegisterCommand';
import { UserRegisterService } from 'Application/User/UserRegisterService';
import { CircleName } from 'Domain/Circle/Circle';
import { CircleService } from 'Domain/Circle/CircleService';
import { ICircleFactory } from 'Domain/Circle/ICircleFattory';
import { IUserFactory } from 'Domain/User/IUserFactory';
import { UserService } from 'Domain/User/UserService';
import { ICircleRepository } from 'Repository/Circle/ICircleRepository';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { container } from 'tsyringe';
import { CircleCreateCommand } from '../CircleCreateCommand';
import { CircleCreateService } from '../CircleCreateService';
import { CircleJoinCommand } from '../CircleJoinCommand';
import { CircleJoinService } from '../CircleJoinService';

describe('CircleJoinService', () => {
  it('handle makes user to join a circle', async () => {
    const circleFactory: ICircleFactory = container.resolve('ICircleFactory');
    const circleRepository: ICircleRepository = container.resolve(
      'ICircleRepository',
    );
    const circleService = new CircleService(circleRepository);
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const circleJoinService = new CircleJoinService(
      circleRepository,
      userRepository,
    );

    const circleCreateService = new CircleCreateService(
      circleFactory,
      circleRepository,
      circleService,
      userRepository,
    );

    const userFactory: IUserFactory = container.resolve('IUserFactory');
    const userSerice = new UserService(userRepository);
    const userRegisterService = new UserRegisterService(
      userFactory,
      userRepository,
      userSerice,
    );

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

  it('handle makes user to join a circle', async () => {
    const circleFactory: ICircleFactory = container.resolve('ICircleFactory');
    const circleRepository: ICircleRepository = container.resolve(
      'ICircleRepository',
    );
    const circleService = new CircleService(circleRepository);
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const circleJoinService = new CircleJoinService(
      circleRepository,
      userRepository,
    );

    const circleCreateService = new CircleCreateService(
      circleFactory,
      circleRepository,
      circleService,
      userRepository,
    );

    const userFactory: IUserFactory = container.resolve('IUserFactory');
    const userSerice = new UserService(userRepository);
    const userRegisterService = new UserRegisterService(
      userFactory,
      userRepository,
      userSerice,
    );

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
