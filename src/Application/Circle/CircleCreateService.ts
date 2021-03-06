import { CircleName } from 'Domain/Circle/Circle';
import { CircleService } from 'Domain/Circle/CircleService';
import { ICircleFactory } from 'Domain/Circle/ICircleFactory';
import { UserId } from 'Domain/User/UserId';
import { ICircleRepository } from 'Domain/Circle/ICircleRepository';
import { IUserRepository } from 'Domain/User/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { CircleCreateCommand } from './CircleCreateCommand';
import { CircleData } from './CircleData';

@injectable()
export class CircleCreateService {
  private readonly circleFactory: ICircleFactory;
  private readonly circleRepository: ICircleRepository;
  private readonly circleService: CircleService;
  private readonly userRepository: IUserRepository;

  constructor(
    @inject('ICircleFactory') circleFactory: ICircleFactory,
    @inject('ICircleRepository') circleRepository: ICircleRepository,
    circleService: CircleService,
    @inject('IUserRepository') userRepository: IUserRepository,
  ) {
    this.circleFactory = circleFactory;
    this.circleRepository = circleRepository;
    this.circleService = circleService;
    this.userRepository = userRepository;
  }

  async handle(command: CircleCreateCommand): Promise<CircleData> {
    const ownerId = new UserId(command.userId);
    const owner = await this.userRepository.findById(ownerId);
    if (owner === null) {
      throw new Error('Owner not found.');
    }

    const name = new CircleName(command.name);
    const circle = this.circleFactory.create(name, owner);
    if (await this.circleService.exists(circle)) {
      throw new Error('Circle already exists.');
    }

    await this.circleRepository.save(circle);

    return new CircleData(circle);
  }
}
