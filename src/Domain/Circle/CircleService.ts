import { ICircleRepository } from 'Repository/Circle/ICircleRepository';
import { Circle } from './Circle';

export class CircleService {
  private readonly circleRepository: ICircleRepository;

  constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }

  async exists(circle: Circle): Promise<boolean> {
    const duplicated = await this.circleRepository.findByName(circle.name);
    return duplicated !== null;
  }
}
