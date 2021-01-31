import { ICircleRepository } from 'Repository/Circle/ICircleRepository';
import { inject, injectable } from 'tsyringe';
import { Circle } from './Circle';

@injectable()
export class CircleService {
  private readonly circleRepository: ICircleRepository;

  constructor(
    @inject('ICircleRepository') circleRepository: ICircleRepository,
  ) {
    this.circleRepository = circleRepository;
  }

  async exists(circle: Circle): Promise<boolean> {
    const duplicated = await this.circleRepository.findByName(circle.name);
    return duplicated !== null;
  }
}
