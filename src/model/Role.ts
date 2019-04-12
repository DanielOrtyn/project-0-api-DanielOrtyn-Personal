import { IRole } from './IRole';

export class Role implements IRole {
    roleId: number;
    role: string;

    constructor(newRoleId: number, newRole: string) {
        this.roleId = newRoleId;
        this.role = newRole;
    }
}