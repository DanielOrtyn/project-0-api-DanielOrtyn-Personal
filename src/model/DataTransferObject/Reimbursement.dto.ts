import { ISqlReimbursement } from '../Database/ISqlReimbursement.dbo';
import { ISqlReimbursementStatus } from '../Database/ISqlReimbursementStatus.dbo';
import { ISqlReimbursementType } from '../Database/ISqlReimbursementType.dbo';
import { IReimbursement } from '../Server/IReimbursement';
import { IReimbursementStatus } from '../Server/IReimbursementStatus';
import { IReimbursementType } from '../Server/IReimbursementType';
import { Reimbursement } from '../Server/Reimbursement';
import { ReimbursementStatus } from '../Server/ReimbursementStatus';
import { ReimbursementType } from '../Server/ReimbursementType';


export function convertSqlReimbursement(sqlReimbursement: ISqlReimbursement): IReimbursement {
    return new Reimbursement(sqlReimbursement.reimbursementid, sqlReimbursement.author,
        sqlReimbursement.amount, sqlReimbursement.datesubmitted,
        sqlReimbursement.dateresolved, sqlReimbursement.description,
        sqlReimbursement.resolver);
}

export function convertSqlReimbursementStatus(sqlReimbursementStatus: ISqlReimbursementStatus): IReimbursementStatus {
    return new ReimbursementStatus(sqlReimbursementStatus.statusid, sqlReimbursementStatus.status);
}

export function convertSqlReimbursementType(sqlReimbursementType: ISqlReimbursementType): IReimbursementType {
    return new ReimbursementType(sqlReimbursementType.typeid, sqlReimbursementType.type);
}
