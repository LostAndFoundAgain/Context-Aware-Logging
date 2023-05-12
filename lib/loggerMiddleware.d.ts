import { IncomingMessage } from 'http';
export declare function LoggerMiddleware(): (req: IncomingMessage, res: any, next: () => void) => void;
