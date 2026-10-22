import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Makeup } from '../model/makeup.model';
import { Makeup as MakeupService } from '../services/makeup';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-makeup',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-makeup.html',
  styleUrl: './add-makeup.css',
})
export class AddMakeup implements OnInit {


  message = "";
  newMakeup: Makeup = new Makeup();

  categories: Categorie[] = [];
  newIdCat?: number;
  
  constructor(private MakeupService: MakeupService,
              private router: Router) {
  }

  ngOnInit(): void {

  this.MakeupService.listeCategories().
   subscribe(cats => {this.categories = cats; 
                      console.log(cats); 
  }); 
}

addMakeup(){
 this.newMakeup.categorie = this.categories.find(
   cat => (cat.idCat ?? cat.idcat) === this.newIdCat,
 )!;
    this.MakeupService.ajouterMakeup(this.newMakeup) 
                      .subscribe(prod => { 
                      console.log(prod); 
                      this.router.navigate(['makeups']); 
                      }); 
}

}
