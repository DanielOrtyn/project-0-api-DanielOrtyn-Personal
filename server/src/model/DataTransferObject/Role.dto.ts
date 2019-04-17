import { ISqlRole } from '../Database/ISQLRole.dbo';
import { IRole } from '../Server/IRole';
import { Role } from '../Server/Role';

export function convertSqlRole(sqlRole: ISqlRole): IRole {
    return new Role(sqlRole.roleid, sqlRole.role);
}