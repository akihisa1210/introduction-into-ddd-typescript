import { injectable } from 'tsyringe';
import { ICircleRepository } from './ICircleRepository';
import { Circle, CircleId, CircleName } from 'Domain/Circle/Circle';

@injectable()
export class InMemoryCircleRepository implements ICircleRepository {
  public circles: Circle[] = [];

  public async save(circle: Circle): Promise<void> {
    console.log('circles:', this.circles);

    const existingCircleIndex = this.circles.findIndex(
      (existingCircle) => existingCircle.id === circle.id,
    );

    // Register a new circle
    if (existingCircleIndex === -1) {
      this.circles.push(circle);
      console.log('circles:', this.circles);
      return new Promise((resolve) => resolve());
    }

    // Update the existing circle
    const existingCircle = this.circles[existingCircleIndex];
    existingCircle.changeName(circle.name);
    this.circles[existingCircleIndex] = existingCircle;
    return new Promise((resolve) => resolve());
  }

  public async findById(id: CircleId): Promise<Circle | null> {
    console.log('circles:', this.circles);

    const target = this.circles.find((circle) => circle.id.value === id.value);
    if (target !== undefined) {
      return new Promise((resolve) => resolve(target));
    }
    return new Promise((resolve) => resolve(null));
  }

  public findByName(name: CircleName): Promise<Circle | null> {
    console.log('circles:', this.circles);

    const target = this.circles.find(
      (circle) => circle.name.value === name.value,
    );
    if (target !== undefined) {
      return new Promise((resolve) => resolve(target));
    }
    return new Promise((resolve) => resolve(null));
  }
}
