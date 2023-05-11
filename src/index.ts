const winston = require('winston');

// Create a format
const format = winston.format.combine(
  winston.format((info: any) => ({ ...info, level: info.level.toUpperCase() }))(),
  winston.format.align(),
  winston.format.errors({ stack: true }),
  winston.format.timestamp(),
  winston.format.printf((info: any) => {
    // context added through middleware
    info.correlationId = logger.context.correlationId;
    info.Url = logger.context.url;
    info.Method = logger.context.method;
    info.traceId = logger.context.traceId || 'Testing';

    return `${info.timestamp} ${info.traceId} ${info.correlationId}  ${info.Method} ${info.Url} ${info.level} : ${
      info.message
    } ${info.stack ? `\n${info.stack}` : ''} `;
  }),
);

// create logger and add format

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : process.env.LOG_LEVEL,
  transports: [
    new winston.transports.File({ filename: 'SfLogs.log', format }),
    new winston.transports.Console({ format }),
  ],
});
