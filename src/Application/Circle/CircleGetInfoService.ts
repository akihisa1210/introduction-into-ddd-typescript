import { injectable, inject } from 'tsyringe';
import { ICircleRepository } from 'Repository/Circle/ICircleRepository';
import { CircleData } from './CircleData';

export type CircleGetInfoAll = {
  target: 'all';
  value: string;
};

type ArgumentTypeName = CircleGetInfoAll;

type returnType<T> = T extends CircleGetInfoAll ? CircleData[] : never;

@injectable()
export class CircleGetInfoService {
  private readonly circleRepository: ICircleRepository;

  constructor(
    @inject('ICircleRepository') circleRepository: ICircleRepository,
  ) {
    this.circleRepository = circleRepository;
  }

  async handle<T extends ArgumentTypeName>(type: T): Promise<returnType<T>> {
    switch (type.target) {
      case 'all': {
        const circles = await this.circleRepository.findAll();

        const circlesData = [];

        for (const circle of circles) {
          circlesData.push(new CircleData(circle));
        }

        return circlesData as returnType<T>;
      }
      default:
        throw new Error('Invalid target.');
    }
  }
}
