import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Marque } from '../model/marque.model';
import { Makeup } from '../model/makeup.model';
import { Makeup as MakeupService } from '../services/makeup';

@Component({
  selector: 'app-recherche-par-marque',
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-marque.html',
  styleUrl: '../makeups/makeups.css',
})
export class RechercheParMarque implements OnInit {
  produits: Makeup[] = [];
  marques: Marque[] = [];
  idMarque?: number;
  message = '';

  constructor(private makeupService: MakeupService) {}

  ngOnInit(): void {
    this.makeupService.listeMarques().subscribe({
      next: marques => {
        this.marques = marques;
      },
      error: () => {
        this.message = 'Impossible de charger les marques.';
      },
    });
  }

  onChange(): void {
    if (this.idMarque === undefined) {
      this.produits = [];
      return;
    }

    this.makeupService.rechercherParMarque(this.idMarque).subscribe({
      next: produits => {
        this.produits = produits;
        this.message = '';
      },
      error: () => {
        this.produits = [];
        this.message = 'Impossible de rechercher les makeups.';
      },
    });
  }

  formatDate(makeup: Makeup): string {
    const date = makeup.date_expiration ?? makeup.dateExpiration;
    return date ? String(date).substring(0, 10) : '-';
  }

  marqueName(marque: Marque | undefined): string {
    return marque?.nom
      ?? marque?.nomMarque
      ?? marque?.nommarque
      ?? (marque?.id ?? marque?.idMarque ?? marque?.idmarque
        ? `Marque ${marque.id ?? marque.idMarque ?? marque.idmarque}`
        : 'PAS DE MARQUE');
  }
}
