import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categorie } from '../model/categorie.model';
import { Makeup } from '../model/makeup.model';
import { Makeup as MakeupService } from '../services/makeup';

@Component({
  selector: 'app-recherche-par-categorie',
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-categorie.html',
  styleUrl: '../makeups/makeups.css',
})
export class RechercheParCategorie implements OnInit {
  produits: Makeup[] = [];
  categories: Categorie[] = [];
  idCategorie?: number;
  message = '';

  constructor(private makeupService: MakeupService) {}

  ngOnInit(): void {
    this.makeupService.listeCategories().subscribe({
      next: cats => {
        this.categories = cats;
      },
      error: () => {
        this.message = 'Impossible de charger les catégories.';
      },
    });
  }

  onChange(): void {
    if (this.idCategorie === undefined) {
      this.produits = [];
      return;
    }

    this.makeupService.rechercherParCategorie(this.idCategorie).subscribe({
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

  categoryName(categorie: Categorie | undefined): string {
    return categorie?.nom ?? categorie?.nomCat ?? 'PAS DE CATEGORIE';
  }
}
