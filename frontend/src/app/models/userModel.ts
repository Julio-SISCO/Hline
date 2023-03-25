import { Role } from "./role";

export class UserModel{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    matchingPassword:string;
    roles:Role[];
}