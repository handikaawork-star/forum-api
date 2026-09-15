import CommentDetail from '../../Domains/comments/entities/CommentDetail.js';
import ReplyDetail from '../../Domains/replies/entities/ReplyDetail.js';

class GetThreadDetailUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThreadById(threadId);
    const rawComments = await this._commentRepository.getCommentsByThreadId(threadId);
    const rawReplies = await this._replyRepository.getRepliesByThreadId(threadId);

    const comments = rawComments.map((comment) => {
      const commentDetail = new CommentDetail({
        id: comment.id,
        username: comment.username,
        date: comment.date,
        content: comment.content,
        isDelete: comment.is_delete,
        likeCount: comment.like_count,
      });

      const replies = rawReplies
        .filter((reply) => reply.comment_id === comment.id)
        .map((reply) => new ReplyDetail({
          id: reply.id,
          content: reply.content,
          date: reply.date,
          username: reply.username,
          isDelete: reply.is_delete,
        }));

      return {
        id: commentDetail.id,
        username: commentDetail.username,
        date: commentDetail.date,
        replies,
        content: commentDetail.content,
        likeCount: commentDetail.likeCount,
      };
    });

    return { ...thread, comments };
  }
}

export default GetThreadDetailUseCase;
