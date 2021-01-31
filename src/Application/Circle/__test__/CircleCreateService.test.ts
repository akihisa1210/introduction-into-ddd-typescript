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

describe('CircleCreateService', () => {
  it('handle creates a circle', async () => {
    const circleFactory: ICircleFactory = container.resolve('ICircleFactory');
    const circleRepository: ICircleRepository = container.resolve(
      'ICircleRepository',
    );
    const circleService = new CircleService(circleRepository);
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
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

    const userData = await userRegisterService.handle(
      new UserRegisterCommand('user1'),
    );

    await circleCreateService.handle(
      new CircleCreateCommand('circle1', userData.id),
    );

    const circle = await circleRepository.findByName(new CircleName('circle1'));

    expect(circle?.name.value).toEqual('circle1');
  });
});
