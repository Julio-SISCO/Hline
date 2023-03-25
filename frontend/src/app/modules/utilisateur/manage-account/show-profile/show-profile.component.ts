import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'app/models/utilisateur';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {
userLogged:any=new Utilisateur();
  constructor() { }

  ngOnInit(): void {
  }

}
