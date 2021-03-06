
export interface ISqlReimbursement {
    reimbursementid: number;
    author: number;
    amount: number;
    datesubmitted: number;
    dateresolved: number;
    description: string;
    resolver: number;
    status: number;
    type: number;
}