import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Makeup } from '../model/makeup.model';
import { Makeup as MakeupService } from '../services/makeup';
import { Marque } from '../model/marque.model';
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

  marques: Marque[] = [];
  newIdMarque?: number;
  
  constructor(private MakeupService: MakeupService,
              private router: Router) {
  }

  ngOnInit(): void {

  this.MakeupService.listeMarques().
   subscribe(marques => {this.marques = marques;
  }); 
}

addMakeup(){
 this.newMakeup.marque = this.marques.find(
   marque => (marque.id ?? marque.idMarque ?? marque.idmarque) === this.newIdMarque,
 )!;
    this.MakeupService.ajouterMakeup(this.newMakeup) 
                      .subscribe(prod => { 
                      console.log(prod); 
                      this.router.navigate(['makeups']); 
                      }); 
}

}
