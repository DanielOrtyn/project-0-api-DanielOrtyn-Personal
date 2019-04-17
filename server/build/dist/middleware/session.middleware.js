"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_session_1 = __importDefault(require("express-session"));
var sess = {
    secret: '42',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
};
exports.sessionMiddleware = express_session_1.default(sess);
//# sourceMappingURL=session.middleware.js.map