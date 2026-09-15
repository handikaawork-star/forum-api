import express from 'express';

const createUsersRouter = (handler) => {
  const router = express.Router();

  /**
   * @openapi
   * /users:
   *   post:
   *     summary: Register a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [username, password, fullname]
   *             properties:
   *               username:
   *                 type: string
   *                 maxLength: 50
   *                 example: dicoding
   *               password:
   *                 type: string
   *                 example: supersecretpassword
   *               fullname:
   *                 type: string
   *                 example: Dicoding Indonesia
   *     responses:
   *       201:
   *         description: User successfully registered
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
   *                     addedUser:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: string
   *                         username:
   *                           type: string
   *                         fullname:
   *                           type: string
   *       400:
   *         description: Invalid payload or username unavailable
   */
  router.post('/', handler.postUserHandler);

  return router;
};

export default createUsersRouter;
