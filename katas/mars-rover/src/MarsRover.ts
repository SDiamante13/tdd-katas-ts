const DIRECTION = {
  NORTH: 'N',
  EAST: 'E', 
  SOUTH: 'S',
  WEST: 'W'
} as const;

const COMMAND = {
  LEFT: 'L',
  RIGHT: 'R',
  FORWARD: 'F'
} as const;

export class MarsRover {
  constructor(public x: number, public y: number, public direction: string) {}

  execute(commands: string): void {
    for (const command of commands) {
      const { LEFT, RIGHT, FORWARD } = COMMAND;
      if (command === LEFT) {
        this.turnLeft();
      } else if (command === RIGHT) {
        this.turnRight();
      } else if (command === FORWARD) {
        this.moveForward();
      }
    }
  }

  private turnLeft(): void {
    const directions = [DIRECTION.NORTH, DIRECTION.WEST, DIRECTION.SOUTH, DIRECTION.EAST];
    const currentIndex = directions.indexOf(this.direction as any);
    this.direction = directions[(currentIndex + 1) % 4];
  }

  private turnRight(): void {
    const directions = [DIRECTION.NORTH, DIRECTION.EAST, DIRECTION.SOUTH, DIRECTION.WEST];
    const currentIndex = directions.indexOf(this.direction as any);
    this.direction = directions[(currentIndex + 1) % 4];
  }

  private moveForward(): void {
    if (this.direction === DIRECTION.NORTH) {
      this.y += 1;
    } else if (this.direction === DIRECTION.EAST) {
      this.x += 1;
    } else if (this.direction === DIRECTION.SOUTH) {
      this.y -= 1;
    } else if (this.direction === DIRECTION.WEST) {
      this.x -= 1;
    }
  }
}