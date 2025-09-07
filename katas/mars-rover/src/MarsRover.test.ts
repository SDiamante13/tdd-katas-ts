import { Direction, MarsRover } from './MarsRover';

describe('Mars Rover', () => {
  describe('turning', () => {
    it('should complete full left rotation cycle', () => {
      const rover = createRover(0, 0, 'N');

      rover.execute('LLLL');

      expect(rover.toString()).toBe('0:0:N');
    });

    it('should complete full right rotation cycle', () => {
      const rover = createRover(0, 0, 'N');

      rover.execute('RRRR');

      expect(rover.toString()).toBe('0:0:N');
    });
  });
  describe('movement', () => {
    it('should move forward by 1 while facing East', () => {
      const rover = createRover(0, 0, 'N');

      rover.execute('F');

      expect(rover.toString()).toBe('0:1:N');
    });

    it('should move forward by 1 while facing East', () => {
      const rover = createRover(0, 0, 'E');

      rover.execute('F');

      expect(rover.toString()).toBe('1:0:E');
    });

    it('should move forward by 1 while facing South', () => {
      const rover = createRover(0, 0, 'S');

      rover.execute('F');

      expect(rover.toString()).toBe('0:9:S');
    });

    it('should move forward by 1 while facing West', () => {
      const rover = createRover(0, 0, 'W');

      rover.execute('F');

      expect(rover.toString()).toBe('9:0:W');
    });

    it('should move backward by 1 while facing North', () => {
      const rover = createRover(0, 0, 'N');

      rover.execute('B');

      expect(rover.toString()).toBe('0:9:N');
    });

    it('should move backward by 1 while facing East', () => {
      const rover = createRover(0, 0, 'E');

      rover.execute('B');

      expect(rover.toString()).toBe('9:0:E');
    });

    it('should move backward South by 1', () => {
      const rover = createRover(0, 0, 'S');

      rover.execute('B');

      expect(rover.toString()).toBe('0:1:S');
    });
  });
});

const createRover = (x: number, y: number, direction: Direction) =>
    new MarsRover(x, y, direction);
