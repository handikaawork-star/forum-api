import express from 'express';

const createHelloRouter = (handler) => {
  const router = express.Router();

  /**
   * @openapi
   * /hello:
   *   get:
   *     summary: Health check / greeting endpoint
   *     tags: [Hello]
   *     responses:
   *       200:
   *         description: Greeting message
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 data:
   *                   type: object
   *                   properties:
   *                     message:
   *                       type: string
   *                       example: Hello World
   */
  router.get('/', handler.getHelloHandler);

  return router;
};

export default createHelloRouter;
