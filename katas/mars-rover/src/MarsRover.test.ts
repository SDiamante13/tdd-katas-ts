import { MarsRover } from './MarsRover';

describe('Mars Rover', () => {
  describe('turning', () => {
    it('should complete full left rotation cycle', () => {
      const x = 0;
      const y = 0;
      const rover = new MarsRover(x, y, 'N');

      rover.execute('LLLL');
      expect(rover.direction).toBe('N');
    });

    it('should complete full right rotation cycle', () => {

      const x = 0;
      const y = 0;
      const rover = new MarsRover(x, y, 'N');

      rover.execute('RRRR');

      expect(rover.direction).toBe('N');
    });
  });

  describe('movement', () => {
    it('should move forward North by 1', () => {
      const x = 0;
      const y = 0;
      const rover = new MarsRover(x, y, 'N');

      rover.execute('F');

      expect(rover.x).toBe(0);
      expect(rover.y).toBe(1);
    });

    it('should move forward East by 1', () => {
      const x = 0;
      const y = 0;
      const rover = new MarsRover(x, y, 'E');

      rover.execute('F');

      expect(rover.x).toBe(1);
      expect(rover.y).toBe(0);
    });

    it('should move forward South by 1', () => {
      const x = 0;
      const y = 0;
      const rover = new MarsRover(x, y, 'S');

      rover.execute('F');

      expect(rover.x).toBe(0);
      expect(rover.y).toBe(9);
    });

    it('should move forward West by 1', () => {
      const x = 0;
      const y = 0;
      const direction = 'W';

      const rover = new MarsRover(x, y, direction);

      rover.execute('F');

      expect(rover.x).toBe(9);
      expect(rover.y).toBe(0);
    });

    it('should move backward by 1', () => {
      const x = 0;
      const y = 0;
      const direction = 'N';

      const rover = new MarsRover(x, y, direction);

      rover.execute('B');

      expect(rover.x).toBe(0);
      expect(rover.y).toBe(9);
    });

    it('should move backward East by 1', () => {
      const x = 0;
      const y = 0;
      const direction = 'E';

      const rover = new MarsRover(x, y, direction);

      rover.execute('B');

      expect(rover.x).toBe(9);
      expect(rover.y).toBe(0);
    });

    it('should move backward South by 1', () => {
      const x = 0;
      const y = 0;
      const direction = 'S';

      const rover = new MarsRover(x, y, direction);

      rover.execute('B');

      expect(rover.x).toBe(0);
      expect(rover.y).toBe(1);
    });
  });
});

