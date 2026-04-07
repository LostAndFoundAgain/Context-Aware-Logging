import { createLogger, format, transports } from 'winston';
import { RequestContextStore } from './request-context';

const logFormat = format.printf((options) => {
  const context = RequestContextStore.get();
  return `${options.timestamp} ${context.traceId ?? ''} ${context.correlationId ?? ''}  ${context.method ?? ''} ${
    context.url ?? ''
  } ${options.level.toUpperCase()} [${options.label}]: ${options.message} ${options.stack ? `\n${options.stack}` : ''}`;
});

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.timestamp(), logFormat),
  transports: [new transports.Console({ handleExceptions: true, handleRejections: true })],
});

export function setLogLevel(level: string) {
  logger.level = level;
  logger.transports.forEach((t) => {
    t.level = level;
  });
}

export function getLogLevel(): string {
  return logger.transports[0]?.level ?? logger.level;
}
