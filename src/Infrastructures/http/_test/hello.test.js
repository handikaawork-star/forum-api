import request from 'supertest';
import createServer from '../createServer.js';

describe('GET /hello', () => {
  it('should response 200 and Hello World message', async () => {
    // Arrange
    const app = await createServer({});

    // Action
    const response = await request(app).get('/hello');
    const responseJson = response.body;

    // Assert
    expect(response.status).toEqual(200);
    expect(responseJson.status).toEqual('success');
    expect(responseJson.data.message).toEqual('Hello Dunia');
  });
});
