import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Makeup } from '../model/makeup.model';
import { Makeup as MakeupService } from '../services/makeup';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-update-makeup',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-makeup.html',
  styleUrl: '../add-makeup/add-makeup.css',
})
export class UpdateMakeup implements OnInit {

  message = '';
  currentMakeup: Makeup = new Makeup();
  dateExpiration = '';
  marques: Marque[] = [];
  updatedMarqueId?: number;

  constructor(private activatedRoute: ActivatedRoute,private router: Router,
  private makeupService: MakeupService){
  }




  updateMakeup() {
    const makeupToUpdate: Makeup = {
      ...this.currentMakeup,
      dateExpiration: this.dateExpiration,
    };
    delete makeupToUpdate.date_expiration;

    const marque = this.marques.find(
      item => (item.id ?? item.idMarque ?? item.idmarque) === this.updatedMarqueId,
    );
    if (marque) {
      makeupToUpdate.marque = marque;
    }

    this.makeupService.updateMakeup(makeupToUpdate).subscribe({
      next: () => this.router.navigate(['makeups']),
      error: () => {
        this.message = "Problème lors de la modification !";
      },
    });
  }



  
  ngOnInit(): void {
    this.makeupService.listeMarques().subscribe(
      marques => {
        this.marques = marques;
      },
      () => {
        this.message = "Impossible de charger les marques.";
      },
    );
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    const id = Number(idParam);
    if (!idParam || !Number.isInteger(id)) {
      this.message = "Identifiant du makeup invalide.";
      return;
    }

    this.makeupService.consulterMakeup(id).subscribe({
      next: (makeup) => {
        this.currentMakeup = makeup;
        this.updatedMarqueId =
          makeup.marque?.id ?? makeup.marque?.idMarque ?? makeup.marque?.idmarque;
        this.dateExpiration = this.formatDateForInput(
          makeup.date_expiration ?? makeup.dateExpiration,
        );
      },
      error: () => {
        this.message = "Impossible de charger le makeup.";
      },
    });
  }

  private formatDateForInput(date: Date | string | undefined): string {
    if (!date) {
      return '';
    }

    if (typeof date === 'string') {
      return date.substring(0, 10);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
