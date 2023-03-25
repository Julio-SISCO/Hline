import { Utilisateur } from "./utilisateur";

export class Role{
    idRole:number;
	libelle:string;
    utilisateurs:Utilisateur[];
}