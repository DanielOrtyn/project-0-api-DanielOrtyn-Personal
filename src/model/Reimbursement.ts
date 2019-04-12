// import { User } from "./user";
// import { ReimbursementStatus } from "./ReimbursementStatus";
// import { ReimbursementType } from "./ReimbursementType";

export interface Reimbursement {
    // private static idCounter = 0;
    reimbursementId: number; // primary key
    author: number;  // foreign key -> User, not null
    amount: number;  // not null
    dateSubmitted: number; // not null
    dateResolved: number;
    description: string; // not null
    resolver: number; // foreign key -> User
    status: number; // foreign ey -> ReimbursementStatus, not null
    type: number; // foreign key -> ReimbursementType

    // constructor(newAuthor: User, newAmount = 0, newDateSubmitted = 0,
    //     newDateResolved = -1, newDescription = ``, newResolver = -1,
    //     newStatus: ReimbursementStatus, newType: ReimbursementType) {
    //     this.reimbursementId = Reimbursement.idCounter++;
    //     this.author = newAuthor.userId;
    //     this.amount = newAmount;
    //     this.dateSubmitted = newDateSubmitted;
    //     this.dateResolved = newDateResolved;
    //     this.description = newDescription;
    //     this.resolver = newResolver;
    //     this.status = newStatus.statusID;
    //     this.type = newType.typeID;
    // }
}