import { AsyncLocalStorage } from 'async_hooks';

export type RequestContext = {
  correlationId?: string;
  traceId?: string;
  url?: string;
  method?: string;
  [key: string]: any;
};

const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

export const RequestContextStore = {
  run: (context: RequestContext, callback: (...args: any[]) => void) => {
    return asyncLocalStorage.run(context, callback);
  },
  get: () => asyncLocalStorage.getStore() || {},
  set: <K extends keyof RequestContext>(key: K, value: RequestContext[K]) => {
    const store = asyncLocalStorage.getStore();
    if (store) {
      store[key] = value;
    }
  },
};
