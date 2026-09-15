import ReplyDetail from '../ReplyDetail.js';

describe('a ReplyDetail entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      username: 'dicoding',
    };

    // Action and Assert
    expect(() => new ReplyDetail(payload)).toThrowError('REPLY_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      username: 'dicoding',
      date: '2021-08-08T07:59:48.766Z',
      content: 123,
      isDelete: false,
    };

    // Action and Assert
    expect(() => new ReplyDetail(payload)).toThrowError('REPLY_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create replyDetail object correctly when reply is not deleted', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      username: 'dicoding',
      date: '2021-08-08T07:59:48.766Z',
      content: 'sebuah balasan',
      isDelete: false,
    };

    // Action
    const {
      id, username, date, content,
    } = new ReplyDetail(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(date).toEqual(payload.date);
    expect(content).toEqual(payload.content);
  });

  it('should replace content when reply is deleted', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      username: 'dicoding',
      date: '2021-08-08T07:59:48.766Z',
      content: 'sebuah balasan',
      isDelete: true,
    };

    // Action
    const { content } = new ReplyDetail(payload);

    // Assert
    expect(content).toEqual('**balasan telah dihapus**');
  });
});
