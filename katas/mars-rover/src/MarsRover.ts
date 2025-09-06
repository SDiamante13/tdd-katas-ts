export class MarsRover {
  constructor(public x: number, public y: number, public direction: string) {}

  execute(commands: string): void {
    for (const command of commands) {
      if (command === 'L') {
        this.turnLeft();
      } else if (command === 'R') {
        this.turnRight();
      }
    }
  }

  private turnLeft(): void {
    const directions = ['N', 'W', 'S', 'E'];
    const currentIndex = directions.indexOf(this.direction);
    this.direction = directions[(currentIndex + 1) % 4];
  }

  private turnRight(): void {
    const directions = ['N', 'E', 'S', 'W'];
    const currentIndex = directions.indexOf(this.direction);
    this.direction = directions[(currentIndex + 1) % 4];
  }
}