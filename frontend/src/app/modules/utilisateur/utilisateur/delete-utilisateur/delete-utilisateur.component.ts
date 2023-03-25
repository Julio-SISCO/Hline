import { Component, Inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilisateurService } from 'app/services/utilisateur.service';

@Component({
  selector: 'app-delete-utilisateur',
  templateUrl: './delete-utilisateur.component.html',
  styleUrls: ['./delete-utilisateur.component.scss']
})
export class DeleteUtilisateurComponent implements OnInit {

  isDelete = false
  currentUtilisateurId:number
  constructor(
    @Inject(UtilisateurService) private utilisateurService:UtilisateurService,
    private activeModal:NgbActiveModal

  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.utilisateurService.delete(this.currentUtilisateurId).subscribe((data)=>{
      if(data.status == 200){
        this.isDelete = true
        this.activeModal.close(this.isDelete);
      }
    })
  }

  onClose() {
    this.activeModal.close();
  }


}
