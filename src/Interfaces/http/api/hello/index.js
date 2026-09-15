import HelloHandler from './handler.js';
import createHelloRouter from './routes.js';

export default () => {
  const helloHandler = new HelloHandler();
  return createHelloRouter(helloHandler);
};
