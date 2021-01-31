import { Circle, CircleId, CircleName } from './Circle';
import { ICircleFactory } from './ICircleFactory';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'Domain/User/User';

export class CircleFactory implements ICircleFactory {
  create(circleName: CircleName, owner: User): Circle {
    const circleId = new CircleId(uuidv4());

    return new Circle(circleId, circleName, owner, []);
  }
}
