import { Circle } from 'Domain/Circle/Circle';

export class CircleFullSpecification {
  private readonly CIRCLE_UPPER_LIMIT: number = 30;

  isSatisfiedBy(circle: Circle): boolean {
    return circle.countMembers() >= this.CIRCLE_UPPER_LIMIT;
  }
}
