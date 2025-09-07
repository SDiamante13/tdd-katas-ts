export type Direction = 'N' | 'E' | 'S' | 'W';
type Command = 'L' | 'R' | 'F' | 'B';

const N: Direction = 'N';
const E: Direction = 'E';
const S: Direction = 'S';
const W: Direction = 'W';

const L: Command = 'L';
const R: Command = 'R';
const F: Command = 'F';
const B: Command = 'B';

interface Coordinate {
  readonly x: number;
  readonly y: number;
}

const LEFT_ROTATION: readonly Direction[] = [N, W, S, E] as const;
const RIGHT_ROTATION: readonly Direction[] = [N, E, S, W] as const;
const ROTATION_SIZE = 4 as const;

const MOVEMENT_DELTAS: Record<Direction, Coordinate> = {
  [N]: { x: 0, y: 1 },
  [E]: { x: 1, y: 0 },
  [S]: { x: 0, y: -1 },
  [W]: { x: -1, y: 0 }
} as const;

const BACKWARD_DELTAS: Record<Direction, Coordinate> = {
  [N]: { x: 0, y: -1 },
  [E]: { x: -1, y: 0 },
  [S]: { x: 0, y: 1 },
  [W]: { x: 1, y: 0 }
} as const;

const createCoordinate = (x: number, y: number): Coordinate => ({ x, y });

const applyDelta = (coordinate: Coordinate, delta: Coordinate): Coordinate => {
  const newX = ((coordinate.x + delta.x) % 10 + 10) % 10;
  const newY = ((coordinate.y + delta.y) % 10 + 10) % 10;
  return createCoordinate(newX, newY);
};

type CommandHandler = () => void;

export class MarsRover {
  private _position: Coordinate;
  private _direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this._position = createCoordinate(x, y);
    this._direction = direction;
  }

  toString(): string {
    return `${this._position.x}:${this._position.y}:${this._direction}`;
  }

  execute(commands: string): void {
    const validCommands = new Set<string>([L, R, F, B]);
    
    const commandActions: Partial<Record<string, CommandHandler>> = {
      [L]: () => this.turnLeft(),
      [R]: () => this.turnRight(),
      [F]: () => this.moveForward(),
      [B]: () => this.moveBackward()
    };

    for (const command of commands) {
      if (validCommands.has(command)) {
        const action = commandActions[command];
        action?.();
      }
    }
  }

  private turnLeft(): void {
    const currentIndex = LEFT_ROTATION.indexOf(this._direction);
    this._direction = LEFT_ROTATION[(currentIndex + 1) % ROTATION_SIZE];
  }

  private turnRight(): void {
    const currentIndex = RIGHT_ROTATION.indexOf(this._direction);
    this._direction = RIGHT_ROTATION[(currentIndex + 1) % ROTATION_SIZE];
  }

  private moveForward(): void {
    const delta = MOVEMENT_DELTAS[this._direction];
    this._position = applyDelta(this._position, delta);
  }

  private moveBackward(): void {
    const delta = BACKWARD_DELTAS[this._direction];
    this._position = applyDelta(this._position, delta);
  }
}