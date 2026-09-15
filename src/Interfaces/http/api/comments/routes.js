import express from 'express';
import authenticate from '../../../../Infrastructures/http/middlewares/authenticate.js';

const createCommentsRouter = (handler, container) => {
  const router = express.Router({ mergeParams: true });

  /**
   * @openapi
   * /threads/{threadId}/comments:
   *   post:
   *     summary: Add a comment to a thread
   *     tags: [Comments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: threadId
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [content]
   *             properties:
   *               content:
   *                 type: string
   *                 example: sebuah comment
   *     responses:
   *       201:
   *         description: Comment successfully added
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
   *                     addedComment:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: string
   *                         content:
   *                           type: string
   *                         owner:
   *                           type: string
   *       400:
   *         description: Invalid payload
   *       401:
   *         description: Missing or invalid access token
   *       404:
   *         description: Thread not found
   */
  router.post('/', authenticate(container), handler.postCommentHandler);

  /**
   * @openapi
   * /threads/{threadId}/comments/{commentId}:
   *   delete:
   *     summary: Delete (soft-delete) a comment from a thread
   *     tags: [Comments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: threadId
   *         required: true
   *         schema:
   *           type: string
   *       - in: path
   *         name: commentId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Comment successfully deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *       401:
   *         description: Missing or invalid access token
   *       403:
   *         description: Not the comment owner
   *       404:
   *         description: Thread or comment not found
   */
  router.delete('/:commentId', authenticate(container), handler.deleteCommentHandler);

  /**
   * @openapi
   * /threads/{threadId}/comments/{commentId}/likes:
   *   put:
   *     summary: Like or unlike a comment (toggled by current like state)
   *     tags: [Comments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: threadId
   *         required: true
   *         schema:
   *           type: string
   *       - in: path
   *         name: commentId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Like status successfully toggled
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *       401:
   *         description: Missing or invalid access token
   *       404:
   *         description: Thread or comment not found
   */
  router.put('/:commentId/likes', authenticate(container), handler.putCommentLikeHandler);

  return router;
};

export default createCommentsRouter;
