import { ISqlRole } from '../Database/ISQLRole.dbo';
import { IRole } from '../IRole';
import { Role } from '../Role';

export function convertSqlRole(sqlRole: ISqlRole): IRole {
    return new Role(sqlRole.roleid, sqlRole.role);
}