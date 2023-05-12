"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = exports.logger = void 0;
/* tslint:disable */
var uuid_1 = require("uuid");
var winston = require('winston');
var format = winston.format.combine(winston.format(function (info) { return (__assign(__assign({}, info), { level: info.level.toUpperCase() })); })(), winston.format.errors({ stack: true }), winston.format.timestamp(), winston.format.align(), winston.format.printf(function (info) {
    if (exports.logger.context) {
        info.correlationId = exports.logger.context.correlationId;
        info.Url = exports.logger.context.url;
        info.Method = exports.logger.context.method;
        info.traceId = exports.logger.context.traceId || 'Testing';
        return "".concat(info.timestamp, " ").concat(info.traceId, " ").concat(info.correlationId, " ").concat(info.Method, " ").concat(info.Url, " ").concat(info.level, " : ").concat(info.message, " ").concat(info.stack ? "\n".concat(info.stack) : '', " ");
    }
    else {
        return "".concat(info.timestamp, " ").concat(info.level, " : ").concat(info.message, " ").concat(info.stack ? "\n".concat(info.stack) : '', " ");
    }
}));
exports.logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production'
        ? 'info'
        : process.env.NODE_ENV === 'test'
            ? 'Testing'
            : process.env.LOG_LEVEL,
    transports: [
        new winston.transports.File({ filename: 'SfLogs.log', format: format, handleExceptions: true, handleRejections: true }),
        new winston.transports.Console({ format: format, handleExceptions: true, handleRejections: true }),
    ],
});
function LoggerMiddleware() {
    return function (req, res, next) {
        exports.logger.context = {
            url: req.url,
            correlationId: req.headers['X-Correlation-Id'] || (0, uuid_1.v4)(),
            traceId: req.headers['X-Amzn-Trace-Id'],
            method: req.method,
        };
        next();
    };
}
exports.LoggerMiddleware = LoggerMiddleware;
