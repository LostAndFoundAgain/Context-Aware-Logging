import { LoggerMiddleware } from '../loggerMiddleware';

test('Middleware Logger', () => {
  expect(LoggerMiddleware).toBeCalled;
});
