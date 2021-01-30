import { User } from 'Domain/User/User';
import { Circle, CircleName } from './Circle';

export type ICircleFactory = {
  createCircle(name: CircleName, owner: User): Circle;
};
