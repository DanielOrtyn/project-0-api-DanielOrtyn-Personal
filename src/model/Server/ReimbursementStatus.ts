import { IReimbursementStatus } from './IReimbursementStatus';

export class ReimbursementStatus implements IReimbursementStatus {
    statusId: number;
    status: string;

    constructor(newStatusId: number, newStatus: string) {
        this.statusId = newStatusId;
        this.status = newStatus;
    }
}