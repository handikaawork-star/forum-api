import express from 'express';
import authenticate from '../../../../Infrastructures/http/middlewares/authenticate.js';

const createRepliesRouter = (handler, container) => {
  const router = express.Router({ mergeParams: true });

  /**
   * @openapi
   * /threads/{threadId}/comments/{commentId}/replies:
   *   post:
   *     summary: Add a reply to a comment
   *     tags: [Replies]
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
   *                 example: sebuah balasan
   *     responses:
   *       201:
   *         description: Reply successfully added
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
   *                     addedReply:
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
   *         description: Thread or comment not found
   */
  router.post('/', authenticate(container), handler.postReplyHandler);

  /**
   * @openapi
   * /threads/{threadId}/comments/{commentId}/replies/{replyId}:
   *   delete:
   *     summary: Delete (soft-delete) a reply from a comment
   *     tags: [Replies]
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
   *       - in: path
   *         name: replyId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Reply successfully deleted
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
   *         description: Not the reply owner
   *       404:
   *         description: Thread, comment, or reply not found
   */
  router.delete('/:replyId', authenticate(container), handler.deleteReplyHandler);

  return router;
};

export default createRepliesRouter;
