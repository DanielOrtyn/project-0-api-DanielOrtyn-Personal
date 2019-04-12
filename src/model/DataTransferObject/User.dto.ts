import { ISqlUser } from '../Database/ISqlUser.dbo';
import { roles } from '../../state';
import { IRole } from '../Server/IRole';
import { IUser } from '../Server/IUser';
import { User } from '../Server/User';


export function convertSqlUser(sqlUser: ISqlUser): IUser {
    const roleList = roles.filter(role => role.roleId = sqlUser.roleid);
    const userRole: IRole = roleList[0];
    return new User(sqlUser.userid, sqlUser.username, sqlUser.password,
        sqlUser.firstname, sqlUser.lastname, sqlUser.email, userRole);
}