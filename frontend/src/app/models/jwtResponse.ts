import { Role } from "./role";

export class JwtResponse{
    token:string;
	type:string = "Bearer"; 
	id:number; 
	username:string;
	email:string; 
	roles:Role[];
}