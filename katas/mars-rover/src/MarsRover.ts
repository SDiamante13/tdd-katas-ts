const DIRECTION = {
  NORTH: 'N',
  EAST: 'E', 
  SOUTH: 'S',
  WEST: 'W'
} as const;

const COMMAND = {
  LEFT: 'L',
  RIGHT: 'R',
  FORWARD: 'F',
  BACKWARD: 'B'
} as const;

type Direction = 'N' | 'E' | 'S' | 'W';

const LEFT_ROTATION: Direction[] = [DIRECTION.NORTH, DIRECTION.WEST, DIRECTION.SOUTH, DIRECTION.EAST];
const RIGHT_ROTATION: Direction[] = [DIRECTION.NORTH, DIRECTION.EAST, DIRECTION.SOUTH, DIRECTION.WEST];
const ROTATION_SIZE = 4;

const MOVEMENT_DELTAS = {
  [DIRECTION.NORTH]: { x: 0, y: 1 },
  [DIRECTION.EAST]: { x: 1, y: 0 },
  [DIRECTION.SOUTH]: { x: 0, y: -1 },
  [DIRECTION.WEST]: { x: -1, y: 0 }
} as const;

const BACKWARD_DELTAS = {
  [DIRECTION.NORTH]: { x: 0, y: -1 },
  [DIRECTION.EAST]: { x: -1, y: 0 },
  [DIRECTION.SOUTH]: { x: 0, y: 1 },
  [DIRECTION.WEST]: { x: 1, y: 0 }
} as const;

export class MarsRover {
  constructor(public x: number, public y: number, public direction: Direction) {}

  execute(commands: string): void {
    const commandActions = {
      [COMMAND.LEFT]: () => this.turnLeft(),
      [COMMAND.RIGHT]: () => this.turnRight(), 
      [COMMAND.FORWARD]: () => this.moveForward(),
      [COMMAND.BACKWARD]: () => this.moveBackward()
    };

    for (const command of commands) {
      const action = commandActions[command as keyof typeof commandActions];
      action?.();
    }
  }

  private turnLeft(): void {
    const currentIndex = LEFT_ROTATION.indexOf(this.direction);
    this.direction = LEFT_ROTATION[(currentIndex + 1) % ROTATION_SIZE];
  }

  private turnRight(): void {
    const currentIndex = RIGHT_ROTATION.indexOf(this.direction);
    this.direction = RIGHT_ROTATION[(currentIndex + 1) % ROTATION_SIZE];
  }

  private moveForward(): void {
    const delta = MOVEMENT_DELTAS[this.direction];
    this.x += delta.x;
    this.y += delta.y;
  }

  private moveBackward(): void {
    const delta = BACKWARD_DELTAS[this.direction];
    this.x += delta.x;
    this.y += delta.y;
  }
}