"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var connectionInfo = {
    user: process.env['REVATURE_DB_USERNAME'],
    host: process.env['REVATURE_DB_URL'] || 'localhost',
    database: process.env['REVATURE_DB_NAME'] || 'postgres',
    password: process.env['REVATURE_DB_PASSWORD'],
    port: 5432,
    max: 5,
};
exports.connectionPool = new pg_1.Pool(connectionInfo);
exports.SCHEMA_NAME = 'ExpenseReimbursementSystem';
//# sourceMappingURL=connection.js.map