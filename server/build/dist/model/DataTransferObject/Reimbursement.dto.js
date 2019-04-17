"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reimbursement_1 = require("../Server/Reimbursement");
var ReimbursementStatus_1 = require("../Server/ReimbursementStatus");
var ReimbursementType_1 = require("../Server/ReimbursementType");
function convertSqlReimbursement(sqlReimbursement) {
    return new Reimbursement_1.Reimbursement(sqlReimbursement.reimbursementid, sqlReimbursement.author, sqlReimbursement.amount, sqlReimbursement.datesubmitted, sqlReimbursement.dateresolved, sqlReimbursement.description, sqlReimbursement.resolver, sqlReimbursement.status, sqlReimbursement.type);
}
exports.convertSqlReimbursement = convertSqlReimbursement;
function convertSqlReimbursementStatus(sqlReimbursementStatus) {
    return new ReimbursementStatus_1.ReimbursementStatus(sqlReimbursementStatus.statusid, sqlReimbursementStatus.status);
}
exports.convertSqlReimbursementStatus = convertSqlReimbursementStatus;
function convertSqlReimbursementType(sqlReimbursementType) {
    return new ReimbursementType_1.ReimbursementType(sqlReimbursementType.typeid, sqlReimbursementType.type);
}
exports.convertSqlReimbursementType = convertSqlReimbursementType;
//# sourceMappingURL=Reimbursement.dto.js.map