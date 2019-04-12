
import { IRole } from './model/IRole';
import { GetRoleList } from './router/service/roles-service';
import { ISqlRole } from './model/Database/ISQLRole.dbo';
import { convertSqlRole } from './model/DataTransferObject/Role.dto';

export let roles: IRole[] = [];

GetRoleList().then(function whenOk(response) {
    for (const row of response) {
        roles.push(convertSqlRole(<ISqlRole>row));
    }
});