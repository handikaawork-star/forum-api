import express from 'express';

const createAuthenticationsRouter = (handler) => {
  const router = express.Router();

  /**
   * @openapi
   * /authentications:
   *   post:
   *     summary: Login and obtain access & refresh tokens
   *     tags: [Authentications]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [username, password]
   *             properties:
   *               username:
   *                 type: string
   *                 example: dicoding
   *               password:
   *                 type: string
   *                 example: supersecretpassword
   *     responses:
   *       201:
   *         description: Login successful
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
   *                     accessToken:
   *                       type: string
   *                     refreshToken:
   *                       type: string
   *       400:
   *         description: Invalid payload
   *       401:
   *         description: Wrong username or password
   */
  router.post('/', handler.postAuthenticationHandler);

  /**
   * @openapi
   * /authentications:
   *   put:
   *     summary: Refresh access token using a refresh token
   *     tags: [Authentications]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [refreshToken]
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: New access token issued
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
   *                     accessToken:
   *                       type: string
   *       400:
   *         description: Invalid or unregistered refresh token
   */
  router.put('/', handler.putAuthenticationHandler);

  /**
   * @openapi
   * /authentications:
   *   delete:
   *     summary: Logout by invalidating a refresh token
   *     tags: [Authentications]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [refreshToken]
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Logout successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *       400:
   *         description: Invalid or unregistered refresh token
   */
  router.delete('/', handler.deleteAuthenticationHandler);

  return router;
};

export default createAuthenticationsRouter;
