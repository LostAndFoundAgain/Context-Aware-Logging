import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { RequestContextStore } from './request-context';
import { X_CORRELATION_ID, X_AMZN_TRACE_ID, TRACE_ID_NA } from './constants';
import { NextFunction } from 'express';

export function RequestContextMiddleware(additionalContextFields: string[] = []) {
  return (req: IncomingMessage, res: ServerResponse, next:NextFunction) => {
    const context: Record<string, any> = {
      correlationId: (req.headers[X_CORRELATION_ID] as string) || uuidv4(),
      traceId: (req.headers[X_AMZN_TRACE_ID] as string) || TRACE_ID_NA,
      url: req.url,
      method: req.method,
    };
    additionalContextFields.forEach((attribute) => {
      context[attribute] = req.headers[attribute.toLowerCase()] ?? (req as any)[attribute];
    });
    RequestContextStore.run(context, () => {
      res.setHeader('CorrelationId', context.correlationId);
      next();
    });
  };
}
