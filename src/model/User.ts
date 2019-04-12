import { Role } from './Role';

export interface User {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;

    // constructor(newUserId = 0, newUsername = ``, newPassword = ``,
    //     newFirstName = ``, newLastName = ``, newEmail = ``, newRole: Role) {
    //     this.userId = newUserId;
    //     this.username = newUsername;
    //     this.password = newPassword;
    //     this.firstName = newFirstName;
    //     this.lastName = newLastName;
    //     this.email = newEmail;
    //     this.role = newRole;
    // }
}