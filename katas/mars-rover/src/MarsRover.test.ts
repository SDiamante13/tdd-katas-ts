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

  describe('combined movements', () => {
    it('should return to original position after forward then backward', () => {
      const rover = createRover(0, 0, 'N');

      rover.execute('FB');

      expect(rover.toString()).toBe('0:0:N');
    });

    it('should advance two positions with two forward moves', () => {
      const rover = createRover(0, 0, 'N');

      rover.execute('FF');

      expect(rover.toString()).toBe('0:2:N');
    });

    it('should handle complex movement sequence FRBLFRBL', () => {
      const rover = createRover(0, 0, 'N');

      rover.execute('FRBLFRBL');

      expect(rover.toString()).toBe('8:2:N');
    });
  });
});

const createRover = (x: number, y: number, direction: Direction) =>
    new MarsRover(x, y, direction);
