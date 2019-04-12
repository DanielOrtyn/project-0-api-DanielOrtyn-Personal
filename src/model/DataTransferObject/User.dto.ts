import { ISqlUser } from '../Database/ISqlUser.dbo';
import { roles } from '../../state';
import { IRole } from '../IRole';
import { IUser } from '../IUser';
import { User } from '../User';


export function convertSqlUser(sqlUser: ISqlUser): IUser {
    const roleList = roles.filter(role => role.roleId = sqlUser.roleid);
    const userRole: IRole = roleList[0];
    return new User(sqlUser.userid, sqlUser.username, sqlUser.password,
        sqlUser.firstname, sqlUser.lastname, sqlUser.email, userRole);
}