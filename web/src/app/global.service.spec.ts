import { GlobalService } from './global.service';

describe('GlobalService', () => {
  let service: GlobalService;

  beforeEach(() => {
    service = new GlobalService();
  });

  describe('getWindow', () => {
    it('should return the window', () => {
      // GIVEN

      // WHEN getWindow is called
      const returnedWindow = service.getWindow();

      // THEN the window is returned
      expect(returnedWindow).toBe(window);
    });
  });
});
