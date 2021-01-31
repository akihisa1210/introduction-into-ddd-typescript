import { CircleId } from 'Domain/Circle/Circle';
import { UserId } from 'Domain/User/UserId';
import { ICircleRepository } from 'Repository/Circle/ICircleRepository';
import { IUserRepository } from 'Repository/User/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { CircleJoinCommand } from './CircleJoinCommand';

@injectable()
export class CircleJoinService {
  private readonly circleRepository: ICircleRepository;
  private readonly userRepository: IUserRepository;

  constructor(
    @inject('ICircleRepository') circleRepository: ICircleRepository,
    @inject('IUserRepository') userRepository: IUserRepository,
  ) {
    this.circleRepository = circleRepository;
    this.userRepository = userRepository;
  }

  async handle(command: CircleJoinCommand): Promise<void> {
    const memberId = new UserId(command.userId);
    const member = await this.userRepository.findById(memberId);
    if (member === null) {
      throw new Error('User not found.');
    }

    const id = new CircleId(command.circleId);
    const circle = await this.circleRepository.findById(id);
    if (circle === null) {
      throw new Error('Circle not found.');
    }

    circle.join(member);
    this.circleRepository.save(circle);
  }
}
