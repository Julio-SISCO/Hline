import { Image } from "./image";
import { Profile } from "./profile";
import { Role } from "./role";

export class Utilisateur{
	idUti:number;
	nom:string;
	prenom:string;
	email:string;
	adresse:string;
	telephone:string;
	statut:string;
	password:string;
	profile:Profile;
	enabled:boolean = false;
	imageProf:Image;
	imageUrl:any;
	roles:any;
	createurUtilisateur:Utilisateur;
}