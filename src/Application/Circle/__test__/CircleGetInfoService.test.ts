import { container } from 'tsyringe';
import {
  CircleGetInfoAll,
  CircleGetInfoService,
} from '../CircleGetInfoService';
import { UserName } from 'Domain/User/UserName';
import { IUserFactory } from 'Domain/User/IUserFactory';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { ICircleFactory } from 'Domain/Circle/ICircleFactory';
import { CircleName } from 'Domain/Circle/Circle';
import { ICircleRepository } from 'Repository/Circle/ICircleRepository';

beforeEach(() => {
  container.clearInstances();
});

describe('CircleGetInfoService', () => {
  it('handle returns empty object if no circle is created', async () => {
    const circleGetInfoService = container.resolve(CircleGetInfoService);

    const circleGetInfoAll: CircleGetInfoAll = { target: 'all', value: '' };

    const circlesData = await circleGetInfoService.handle(circleGetInfoAll);

    expect(circlesData).toEqual([]);
  });

  it('handle returns all circles if circles are registered', async () => {
    const circleFactory: ICircleFactory = container.resolve('ICircleFactory');
    const circleRepository: ICircleRepository = container.resolve(
      'ICircleRepository',
    );
    const userFactory: IUserFactory = container.resolve('IUserFactory');
    const userRepository: IUserRepository = container.resolve(
      'IUserRepository',
    );
    const circleGetInfoService = container.resolve(CircleGetInfoService);

    const owner = userFactory.create(new UserName('owner1'));

    await userRepository.save(owner);

    await circleRepository.save(
      circleFactory.create(new CircleName('circle1'), owner),
    );
    await circleRepository.save(
      circleFactory.create(new CircleName('circle2'), owner),
    );

    const circleGetInfoAll: CircleGetInfoAll = { target: 'all', value: '' };

    const cieclesData = await circleGetInfoService.handle(circleGetInfoAll);

    expect(cieclesData.length).toEqual(2);
    expect(cieclesData[0].name).toEqual('circle1');
    expect(cieclesData[1].name).toEqual('circle2');
  });
});
