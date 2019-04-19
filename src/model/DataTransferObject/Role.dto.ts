
import { IRole } from '../Server/IRole';
import { Role } from '../Server/Role';
import { ISqlRole } from '../Database/ISqlRole.dbo';

export function convertSqlRole(sqlRole: ISqlRole): IRole {
    return new Role(sqlRole.roleid, sqlRole.role);
}