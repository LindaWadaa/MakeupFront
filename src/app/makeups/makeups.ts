import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Makeup } from '../model/makeup.model';
import { Makeup as MakeupService } from '../services/makeup';

@Component({
  selector: 'app-makeups',
  imports: [CommonModule, RouterLink],
  templateUrl: './makeups.html',
  styleUrl: './makeups.css',
})
export class Makeups {

  makeups : Makeup[] = [];



  ngOnInit(): void {
    this.chargeMakeup();  
    
  }

  chargeMakeup(){
    this.makeupService.listeMakeup().subscribe(makeups => {
    console.log(makeups);
    this.makeups = makeups;
    });
  }

  formatDate(makeup: Makeup): string {
    const date = makeup.date_expiration ?? makeup.dateExpiration;
    if (!date) {
      return '-';
    }

    if (typeof date === 'string') {
      return date.substring(0, 10);
    }

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }



  supprimerMakeup(m: Makeup){

    let conf = confirm("Etes-vous sûr ?");
    if (conf && m.id !== undefined)
    this.makeupService.supprimerMakeup(m.id).subscribe(() =>{
    console.log("makeup supprimé");
    //this.chargeMakeup();
    this.router.navigate(['produits']);});
}




  constructor(private makeupService: MakeupService, private router: Router)  {
    //this.makeups = this.MakeupService.listeMakeups();
  }

  
}
