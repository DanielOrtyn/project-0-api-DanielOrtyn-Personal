import { IRole } from './IRole';

export interface IUser {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: IRole;
}