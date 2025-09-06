import { MarsRover } from './MarsRover';

describe('Mars Rover', () => {
  describe('turning', () => {
    it('should turn left from North to West', () => {
      const rover = new MarsRover(0, 0, 'N');
      rover.execute('L');
      expect(rover.direction).toBe('W');
    });

    it('should turn right from North to East', () => {
      const rover = new MarsRover(0, 0, 'N');
      rover.execute('R');
      expect(rover.direction).toBe('E');
    });

    it('should turn left twice with LL command from North to South', () => {
      const rover = new MarsRover(0, 0, 'N');
      rover.execute('LL');
      expect(rover.direction).toBe('S');
    });
  });
});

