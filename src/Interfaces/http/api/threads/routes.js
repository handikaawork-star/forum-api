import express from 'express';
import authenticate from '../../../../Infrastructures/http/middlewares/authenticate.js';

const createThreadsRouter = (handler, container) => {
  const router = express.Router();

  /**
   * @openapi
   * /threads:
   *   post:
   *     summary: Add a new thread
   *     tags: [Threads]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [title, body]
   *             properties:
   *               title:
   *                 type: string
   *                 example: sebuah thread
   *               body:
   *                 type: string
   *                 example: sebuah body thread
   *     responses:
   *       201:
   *         description: Thread successfully added
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
   *                     addedThread:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: string
   *                         title:
   *                           type: string
   *                         owner:
   *                           type: string
   *       400:
   *         description: Invalid payload
   *       401:
   *         description: Missing or invalid access token
   */
  router.post('/', authenticate(container), handler.postThreadHandler);

  /**
   * @openapi
   * /threads/{threadId}:
   *   get:
   *     summary: Get thread detail with its comments
   *     tags: [Threads]
   *     parameters:
   *       - in: path
   *         name: threadId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Thread detail
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
   *                     thread:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: string
   *                         title:
   *                           type: string
   *                         body:
   *                           type: string
   *                         date:
   *                           type: string
   *                         username:
   *                           type: string
   *                         comments:
   *                           type: array
   *                           items:
   *                             type: object
   *                             properties:
   *                               id:
   *                                 type: string
   *                               username:
   *                                 type: string
   *                               date:
   *                                 type: string
   *                               content:
   *                                 type: string
   *                               likeCount:
   *                                 type: number
   *       404:
   *         description: Thread not found
   */
  router.get('/:threadId', handler.getThreadHandler);

  return router;
};

export default createThreadsRouter;
