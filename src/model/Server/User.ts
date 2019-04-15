import { IUser } from './IUser';
import { IRole } from './IRole';


export class User implements IUser {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: IRole;

    constructor(newUserId: number, newUsername: string, newPassword: string,
        newFirstName: string, newLastName: string, newEmail: string, newRole: IRole = undefined) {
        this.userId = newUserId;
        this.username = newUsername;
        this.password = newPassword;
        this.firstName = newFirstName;
        this.lastName = newLastName;
        this.email = newEmail;
        this.role = newRole;
    }
}