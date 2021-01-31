import { UserRegisterCommand } from 'Application/User/UserRegisterCommand';
import { UserRegisterService } from 'Application/User/UserRegisterService';
import { CircleName } from 'Domain/Circle/Circle';
import { ICircleRepository } from 'Repository/Circle/ICircleRepository';
import { container } from 'tsyringe';
import { CircleCreateCommand } from '../CircleCreateCommand';
import { CircleCreateService } from '../CircleCreateService';

beforeEach(() => {
  container.clearInstances();
});

describe('CircleCreateService', () => {
  it('handle creates a circle', async () => {
    const circleRepository: ICircleRepository = container.resolve(
      'ICircleRepository',
    );
    const circleCreateService: CircleCreateService = container.resolve(
      CircleCreateService,
    );
    const userRegisterService = container.resolve(UserRegisterService);

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
