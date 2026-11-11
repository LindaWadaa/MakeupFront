import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque.model';
import { Makeup as MakeupService } from '../services/makeup';
import { UpdateMarque } from '../update-marque/update-marque';

@Component({
  selector: 'app-liste-marques',
  imports: [CommonModule, UpdateMarque],
  templateUrl: './liste-marques.html',
})
export class ListeMarques implements OnInit {
  marques: Marque[] = [];
  marqueSelectionnee: Marque = { id: undefined, nom: '', description: '' };
  ajout = true;
  message = '';

  constructor(private makeupService: MakeupService) {}

  ngOnInit(): void {
    this.chargerMarques();
  }

  chargerMarques(): void {
    this.makeupService.listeMarques().subscribe({
      next: marques => {
        this.marques = marques;
        this.message = '';
      },
      error: () => {
        this.message = 'Impossible de charger les marques.';
      },
    });
  }

  selectionnerMarque(marque: Marque): void {
    this.marqueSelectionnee = { ...marque };
    this.ajout = false;
  }

  reinitialiserFormulaire(): void {
    this.marqueSelectionnee = { id: undefined, nom: '', description: '' };
    this.ajout = true;
  }

  marqueUpdated(marque: Marque): void {
    const operation = this.ajout
      ? this.makeupService.ajouterMarque(marque)
      : this.makeupService.modifierMarque(marque);

    operation.subscribe({
      next: () => {
        this.chargerMarques();
        this.reinitialiserFormulaire();
      },
      error: () => {
        this.message = this.ajout
          ? "Impossible d'ajouter la marque."
          : 'Impossible de modifier la marque.';
      },
    });
  }
}
