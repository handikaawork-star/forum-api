import { vi } from 'vitest';
import CommentRepository from '../../../Domains/comments/CommentRepository.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import ReplyRepository from '../../../Domains/replies/ReplyRepository.js';
import GetThreadDetailUseCase from '../GetThreadDetailUseCase.js';

describe('GetThreadDetailUseCase', () => {
  it('should orchestrating the get thread detail action correctly', async () => {
    // Arrange
    const threadId = 'thread-123';

    const mockThread = {
      id: threadId,
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'dicoding',
    };

    const mockRawComments = [
      {
        id: 'comment-123',
        username: 'johndoe',
        date: '2021-08-08T07:22:33.555Z',
        content: 'sebuah comment',
        'is_delete': false,
        'like_count': 2,
      },
      {
        id: 'comment-124',
        username: 'dicoding',
        date: '2021-08-08T07:26:21.338Z',
        content: 'komentar yang dihapus',
        'is_delete': true,
        'like_count': 0,
      },
    ];

    const mockRawReplies = [
      {
        id: 'reply-123',
        'comment_id': 'comment-123',
        username: 'dicoding',
        date: '2021-08-08T08:07:01.522Z',
        content: 'sebuah balasan',
        'is_delete': false,
      },
      {
        id: 'reply-124',
        'comment_id': 'comment-123',
        username: 'johndoe',
        date: '2021-08-08T07:59:48.766Z',
        content: 'balasan yang dihapus',
        'is_delete': true,
      },
    ];

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = vi.fn()
      .mockImplementation(() => Promise.resolve(mockThread));
    mockCommentRepository.getCommentsByThreadId = vi.fn()
      .mockImplementation(() => Promise.resolve(mockRawComments));
    mockReplyRepository.getRepliesByThreadId = vi.fn()
      .mockImplementation(() => Promise.resolve(mockRawReplies));

    /** creating use case instance */
    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const thread = await getThreadDetailUseCase.execute(threadId);

    // Assert
    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(threadId);
    expect(mockReplyRepository.getRepliesByThreadId).toBeCalledWith(threadId);

    expect(thread.id).toEqual(mockThread.id);
    expect(thread.title).toEqual(mockThread.title);
    expect(thread.body).toEqual(mockThread.body);
    expect(thread.date).toEqual(mockThread.date);
    expect(thread.username).toEqual(mockThread.username);

    expect(thread.comments).toHaveLength(2);

    expect(thread.comments[0].id).toEqual('comment-123');
    expect(thread.comments[0].content).toEqual('sebuah comment');
    expect(thread.comments[0].likeCount).toEqual(2);
    expect(thread.comments[0].replies).toHaveLength(2);
    expect(thread.comments[0].replies[0].id).toEqual('reply-123');
    expect(thread.comments[0].replies[0].content).toEqual('sebuah balasan');
    expect(thread.comments[0].replies[1].id).toEqual('reply-124');
    expect(thread.comments[0].replies[1].content).toEqual('**balasan telah dihapus**');

    expect(thread.comments[1].id).toEqual('comment-124');
    expect(thread.comments[1].content).toEqual('**komentar telah dihapus**');
    expect(thread.comments[1].likeCount).toEqual(0);
    expect(thread.comments[1].replies).toHaveLength(0);
  });
});
