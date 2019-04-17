import { ISqlUser } from '../Database/ISqlUser.dbo';
import { IUser } from '../Server/IUser';
import { User } from '../Server/User';


export function convertSqlUser(sqlUser: ISqlUser): IUser {
    return new User(sqlUser.userid, sqlUser.username, undefined,
        sqlUser.firstname, sqlUser.lastname, sqlUser.email);
}