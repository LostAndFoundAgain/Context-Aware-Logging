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
exports.logger = void 0;
var winston = require('winston');
// Create a format
var format = winston.format.combine(winston.format(function (info) { return (__assign(__assign({}, info), { level: info.level.toUpperCase() })); })(), winston.format.align(), winston.format.errors({ stack: true }), winston.format.timestamp(), winston.format.printf(function (info) {
    // context added through middleware
    info.correlationId = exports.logger.context.correlationId;
    info.Url = exports.logger.context.url;
    info.Method = exports.logger.context.method;
    info.traceId = exports.logger.context.traceId || 'Testing';
    return "".concat(info.timestamp, " ").concat(info.traceId, " ").concat(info.correlationId, "  ").concat(info.Method, " ").concat(info.Url, " ").concat(info.level, " : ").concat(info.message, " ").concat(info.stack ? "\n".concat(info.stack) : '', " ");
}));
// create logger and add format
exports.logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : process.env.LOG_LEVEL,
    transports: [
        new winston.transports.File({ filename: 'SfLogs.log', format: format }),
        new winston.transports.Console({ format: format }),
    ],
});
