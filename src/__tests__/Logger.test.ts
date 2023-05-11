
import { logger } from '../index';

test('Context logger', () => {
  expect(logger).toBeCalled;
});
