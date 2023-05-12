/* tslint:disable */
import { v4 as uuidv4 } from 'uuid';
import { IncomingMessage } from 'http';
const winston = require('winston');

const format = winston.format.combine(
  winston.format((info: any) => ({ ...info, level: info.level.toUpperCase() }))(),
  winston.format.errors({ stack: true }),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info: any) => {
    if (logger.context) {
      info.correlationId = logger.context.correlationId;
      info.Url = logger.context.url;
      info.Method = logger.context.method;
      info.traceId = logger.context.traceId || 'Testing';

      return `${info.timestamp} ${info.traceId} ${info.correlationId} ${info.Method} ${info.Url} ${info.level} : ${
        info.message
      } ${info.stack ? `\n${info.stack}` : ''} `;
    } else {
      return `${info.timestamp} ${info.level} : ${info.message} ${info.stack ? `\n${info.stack}` : ''} `;
    }
  }),
);

export const logger = winston.createLogger({
  level:
    process.env.NODE_ENV === 'production'
      ? 'info'
      : process.env.NODE_ENV === 'test'
      ? 'Testing'
      : process.env.LOG_LEVEL,
  transports: [
    new winston.transports.File({ filename: 'SfLogs.log', format, handleExceptions: true, handleRejections: true }),
    new winston.transports.Console({ format, handleExceptions: true, handleRejections: true }),
  ],
});

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
