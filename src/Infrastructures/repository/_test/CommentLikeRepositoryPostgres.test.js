import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper.js';
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper.js';
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper.js';
import CommentLikesTableTestHelper from '../../../../tests/CommentLikesTableTestHelper.js';
import pool from '../../database/postgres/pool.js';
import CommentLikeRepositoryPostgres from '../CommentLikeRepositoryPostgres.js';

describe('CommentLikeRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' });
    await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
    await CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', owner: 'user-123' });
  });

  afterEach(async () => {
    await CommentLikesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('isCommentLiked function', () => {
    it('should return false when comment is not liked by owner', async () => {
      // Arrange
      const commentLikeRepositoryPostgres = new CommentLikeRepositoryPostgres(pool, {});

      // Action
      const isLiked = await commentLikeRepositoryPostgres.isCommentLiked('comment-123', 'user-123');

      // Assert
      expect(isLiked).toEqual(false);
    });

    it('should return true when comment is liked by owner', async () => {
      // Arrange
      await CommentLikesTableTestHelper.addCommentLike({
        id: 'like-123',
        commentId: 'comment-123',
        owner: 'user-123',
      });
      const commentLikeRepositoryPostgres = new CommentLikeRepositoryPostgres(pool, {});

      // Action
      const isLiked = await commentLikeRepositoryPostgres.isCommentLiked('comment-123', 'user-123');

      // Assert
      expect(isLiked).toEqual(true);
    });
  });

  describe('likeComment function', () => {
    it('should persist the comment like', async () => {
      // Arrange
      const fakeIdGenerator = () => '123';
      const commentLikeRepositoryPostgres = new CommentLikeRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentLikeRepositoryPostgres.likeComment('comment-123', 'user-123');

      // Assert
      const likes = await CommentLikesTableTestHelper
        .findCommentLikesByCommentIdAndOwner('comment-123', 'user-123');
      expect(likes).toHaveLength(1);
    });
  });

  describe('unlikeComment function', () => {
    it('should remove the comment like', async () => {
      // Arrange
      await CommentLikesTableTestHelper.addCommentLike({
        id: 'like-123',
        commentId: 'comment-123',
        owner: 'user-123',
      });
      const commentLikeRepositoryPostgres = new CommentLikeRepositoryPostgres(pool, {});

      // Action
      await commentLikeRepositoryPostgres.unlikeComment('comment-123', 'user-123');

      // Assert
      const likes = await CommentLikesTableTestHelper
        .findCommentLikesByCommentIdAndOwner('comment-123', 'user-123');
      expect(likes).toHaveLength(0);
    });
  });
});
