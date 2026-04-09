![npm version](https://img.shields.io/npm/v/trace-scope?style=flat-square)
![weekly downloads](https://img.shields.io/npm/dw/trace-scope?style=flat-square)
![total downloads](https://img.shields.io/npm/dt/trace-scope?style=flat-square)
![license](https://img.shields.io/npm/l/trace-scope?style=flat-square)

# Request Context Logger

Lightweight request-scoped logging for Node.js using `AsyncLocalStorage` and Winston.

Automatically attaches metadata like `correlationId`, `traceId`, request `method`, and `url` to every log, without passing context manually.

---

## Features

* Request-scoped context via `AsyncLocalStorage`
* Automatic correlation & trace ID propagation
* Express-compatible middleware
* Zero boilerplate logging
* Custom context fields support (e.g. `userId`, `caseId`)
* Runtime log level control

---

## Installation

```bash
npm install context-aware-logging
```

---

## Usage

### 1. Add Middleware

```ts
import express from 'express';
import { RequestContextMiddleware } from 'context-aware-logging';

const app = express();

// Must be added before routes
app.use(RequestContextMiddleware(['caseId', 'userId']));
```

---

### 2. Use Logger Anywhere

```ts
import { logger } from 'context-aware-logging';

logger.info('Processing request');
logger.error('Something failed');
```

---

### 3. Example Log Output

```
2026-04-07T12:00:00.000Z traceId correlationId caseId userId GET /api/items INFO [my-service]: Processing request
```

---

## How It Works

* Middleware initializes a per-request context
* Context is stored using `AsyncLocalStorage`
* Logger reads context automatically on each log call

---

## Configuration

### Environment Variables

| Variable             | Default | Description                                  |
| -------------------- | ------- | -------------------------------------------- |
| `LOG_LEVEL`          | `info`  | Log level (`error`, `warn`, `info`, `debug`) |
| `SOURCE_APPLICATION` | `app`   | Label shown in logs                          |
| `NODE_ENV`           | -       | Disables logs in `test` mode                 |

---

### Runtime Log Level

```ts
import { setLogLevel } from 'context-aware-logging';

setLogLevel('debug');
```

---

## API

### `RequestContextMiddleware(fields?: string[])`

Initializes request context.
Pass additional fields to extract from headers or request.

---

### `logger`

Winston-based logger with automatic context injection.

---

### `RequestContextStore`

Access or modify context manually.

```ts
import { RequestContextStore } from 'context-aware-logging';

const context = RequestContextStore.get();
RequestContextStore.set('userId', '123');
```

---

## Important Notes

* Middleware must be registered **before all routes**
* Context propagation depends on async flow. Avoid breaking it with unmanaged threads/workers
* Works with Express and similar middleware-based frameworks

---

## 📄 License

MIT
