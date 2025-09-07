type Direction = 'N' | 'E' | 'S' | 'W';
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
  readonly value: number;
}

interface Delta {
  readonly x: number;
  readonly y: number;
}

const LEFT_ROTATION: readonly Direction[] = [N, W, S, E] as const;
const RIGHT_ROTATION: readonly Direction[] = [N, E, S, W] as const;
const ROTATION_SIZE = 4 as const;

const MOVEMENT_DELTAS: Record<Direction, Delta> = {
  [N]: { x: 0, y: 1 },
  [E]: { x: 1, y: 0 },
  [S]: { x: 0, y: -1 },
  [W]: { x: -1, y: 0 }
} as const;

const BACKWARD_DELTAS: Record<Direction, Delta> = {
  [N]: { x: 0, y: -1 },
  [E]: { x: -1, y: 0 },
  [S]: { x: 0, y: 1 },
  [W]: { x: 1, y: 0 }
} as const;

const createCoordinate = (value: number): Coordinate => ({ value });

const addDelta = (coordinate: Coordinate, delta: number): Coordinate => {
  const newValue = ((coordinate.value + delta) % 10 + 10) % 10;
  return createCoordinate(newValue);
};

type CommandHandler = () => void;

export class MarsRover {
  private readonly _x: Coordinate;
  private readonly _y: Coordinate;
  private _direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this._x = createCoordinate(x);
    this._y = createCoordinate(y);
    this._direction = direction;
  }

  get x(): number { return this._x.value; }
  get y(): number { return this._y.value; }
  get direction(): Direction { return this._direction; }

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
    Object.assign(this._x, addDelta(this._x, delta.x));
    Object.assign(this._y, addDelta(this._y, delta.y));
  }

  private moveBackward(): void {
    const delta = BACKWARD_DELTAS[this._direction];
    Object.assign(this._x, addDelta(this._x, delta.x));
    Object.assign(this._y, addDelta(this._y, delta.y));
  }
}