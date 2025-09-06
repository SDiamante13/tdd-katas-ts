import { MarsRover } from './MarsRover';

describe('Mars Rover', () => {
  describe('turning', () => {
    it('should complete full left rotation cycle', () => {
      const rover = new MarsRover(0, 0, 'N');
      rover.execute('LLLL');
      expect(rover.direction).toBe('N');
    });

    it('should complete full right rotation cycle', () => {
      const rover = new MarsRover(0, 0, 'N');
      rover.execute('RRRR');
      expect(rover.direction).toBe('N');
    });
  });

  describe('movement', () => {
    it('should move forward North by 1', () => {
      const rover = new MarsRover(0, 0, 'N');
      rover.execute('F');
      expect(rover.x).toBe(0);
      expect(rover.y).toBe(1);
    });
  });
});

