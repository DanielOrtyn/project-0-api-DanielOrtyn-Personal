
import { IReimbursement } from './IReimbursement';
import { IReimbursementStatus } from './IReimbursementStatus';
import { IReimbursementType } from './IReimbursementType';

export class Reimbursement implements IReimbursement {
    reimbursementId: number;
    author: number;
    amount: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status?: IReimbursementStatus;
    type?: IReimbursementType;

    constructor(newReimbursementId: number, newAuthor: number,
        newAmount: number, newDateSubmitted: number,
        newDateResolved: number, newDescription: string,
        newResolver: number, newStatus: IReimbursementStatus = undefined,
        newType: IReimbursementType = undefined) {

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
}