import { IReimbursementType } from './IReimbursementType';

export class ReimbursementType implements IReimbursementType {
    typeId: number;
    type: string;

    constructor(newTypeId: number, newType: string) {
        this.typeId = newTypeId;
        this.type = newType;
    }
}