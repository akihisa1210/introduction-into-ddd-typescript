import { Circle, CircleId, CircleName } from 'Domain/Circle/Circle';

export type ICircleRepository = {
  save(circle: Circle): Promise<void>;

  findById(id: CircleId): Promise<Circle | null>;
  findByName(name: CircleName): Promise<Circle | null>;
};
