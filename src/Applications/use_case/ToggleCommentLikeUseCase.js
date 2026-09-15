class ToggleCommentLikeUseCase {
  constructor({ commentLikeRepository, commentRepository, threadRepository }) {
    this._commentLikeRepository = commentLikeRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const { threadId, commentId, owner } = useCasePayload;

    await this._threadRepository.verifyThreadExists(threadId);
    await this._commentRepository.verifyCommentExists(threadId, commentId);

    const isLiked = await this._commentLikeRepository.isCommentLiked(commentId, owner);

    if (isLiked) {
      await this._commentLikeRepository.unlikeComment(commentId, owner);
    } else {
      await this._commentLikeRepository.likeComment(commentId, owner);
    }
  }
}

export default ToggleCommentLikeUseCase;
