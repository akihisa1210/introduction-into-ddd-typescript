import { ICircleRepository } from 'Repository/Circle/ICircleRepository';
import { Circle } from './Circle';

export class CircleService {
  private readonly circleRepository: ICircleRepository;

  constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }

  exists(circle: Circle): boolean {
    const duplicated = this.circleRepository.findByName(circle.name);
    return duplicated !== null;
  }
}
