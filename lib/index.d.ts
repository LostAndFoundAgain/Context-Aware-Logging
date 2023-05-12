import { IncomingMessage } from 'http';
export declare const logger: any;
export declare function LoggerMiddleware(): (req: IncomingMessage, res: any, next: () => void) => void;
