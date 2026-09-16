import { describe, it, expect, vi } from 'vitest';
import HelloHandler from '../handler.js';

describe('HelloHandler', () => {
  describe('getHelloHandler', () => {
    it('should respond 200 with a Hello World message', async () => {
      // Arrange
      const handler = new HelloHandler();
      const req = {};
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      // Action
      await handler.getHelloHandler(req, res);

      // Assert
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        status: 'success',
        data: {
          message: 'Hello World!',
        },
      });
    });
  });
});
