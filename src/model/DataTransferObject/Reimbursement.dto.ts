import { ISqlReimbursement } from '../Database/ISqlReimbursement.dbo';
import { ISqlReimbursementStatus } from '../Database/ISqlReimbursementStatus.dbo';
import { ISqlReimbursementType } from '../Database/ISqlReimbursementType.dbo';
import { IReimbursement } from '../IReimbursement';
import { IReimbursementStatus } from '../IReimbursementStatus';
import { IReimbursementType } from '../IReimbursementType';
import { Reimbursement } from '../Reimbursement';
import { ReimbursementStatus } from '../ReimbursementStatus';
import { ReimbursementType } from '../ReimbursementType';


export function convertSqlReimbursement(sqlReimbursement: ISqlReimbursement): IReimbursement {
    return new Reimbursement(sqlReimbursement.reimbursementid, sqlReimbursement.author,
        sqlReimbursement.amount, sqlReimbursement.datesubmitted,
        sqlReimbursement.dateresolved, sqlReimbursement.description,
        sqlReimbursement.resolver, sqlReimbursement.status,
        sqlReimbursement.type);
}

export function convertSqlReimbursementStatus(sqlReimbursementStatus: ISqlReimbursementStatus): IReimbursementStatus {
    return new ReimbursementStatus(sqlReimbursementStatus.statusid, sqlReimbursementStatus.status);
}

export function convertSqlReimbursementType(sqlReimbursementType: ISqlReimbursementType): IReimbursementType {
    return new ReimbursementType(sqlReimbursementType.typeid, sqlReimbursementType.type);
}
