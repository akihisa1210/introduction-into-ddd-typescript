import { User } from 'Domain/User/User';
import { Circle, CircleName } from './Circle';

export type ICircleFactory = {
  create(name: CircleName, owner: User): Promise<Circle>;
};
