import { logger } from '../index';
import { LoggerMiddleware } from '../index';

test('Context logger', () => {
  expect(logger).toBeCalled;
});

test('Middleware Logger', () => {
  expect(LoggerMiddleware).toBeCalled;
});
