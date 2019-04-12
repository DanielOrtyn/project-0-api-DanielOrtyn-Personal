import { IReimbursementStatus } from './IReimbursementStatus';
import { IReimbursementType } from './IReimbursementType';

export interface IReimbursement {
    reimbursementId: number;
    author: number;
    amount: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status: IReimbursementStatus;
    type: IReimbursementType;
}