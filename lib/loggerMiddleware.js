"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
var uuid_1 = require("uuid");
var _1 = require(".");
function LoggerMiddleware() {
    return function (req, res, next) {
        _1.logger.context = {
            url: req.url,
            correlationId: req.headers['X-Correlation-Id'] || (0, uuid_1.v4)(),
            traceId: req.headers['X-Amzn-Trace-Id'],
            method: req.method,
        };
        next();
    };
}
exports.LoggerMiddleware = LoggerMiddleware;
