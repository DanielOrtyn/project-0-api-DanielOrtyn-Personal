"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reimbursement = /** @class */ (function () {
    function Reimbursement(newReimbursementId, newAuthor, newAmount, newDateSubmitted, newDateResolved, newDescription, newResolver, newStatus, newType) {
        this.reimbursementId = newReimbursementId;
        this.author = newAuthor;
        this.amount = newAmount;
        this.dateSubmitted = newDateSubmitted;
        this.dateResolved = newDateResolved;
        this.description = newDescription;
        this.resolver = newResolver;
        this.status = newStatus;
        this.type = newType;
    }
    return Reimbursement;
}());
exports.Reimbursement = Reimbursement;
//# sourceMappingURL=Reimbursement.js.map