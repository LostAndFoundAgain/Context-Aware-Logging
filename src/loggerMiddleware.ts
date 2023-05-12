import { v4 as uuidv4 } from 'uuid';
import { logger } from '.';
import { IncomingMessage } from 'http';

export function LoggerMiddleware() {
  return (req: IncomingMessage, res: any, next: () => void) => {
    logger.context = {
      url: req.url,
      correlationId: req.headers['X-Correlation-Id'] || uuidv4(),
      traceId: req.headers['X-Amzn-Trace-Id'],
      method: req.method,
    };
    next();
  };
}
