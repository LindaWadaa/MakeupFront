import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Marque } from '../model/marque.model';
import { Makeup } from '../model/makeup.model';
import { Makeup as MakeupService } from '../services/makeup';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
})
export class RechercheParNom implements OnInit {
  nomProduit = '';
  produits: Makeup[] = [];
  allProduits: Makeup[] = [];
  searchTerm = '';
  message = '';

  constructor(private makeupService: MakeupService) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  rechercherProds(): void {
    const nom = this.nomProduit.trim();
    if (!nom) {
      this.chargerProduits();
      return;
    }

    this.makeupService.rechercherParNom(nom).subscribe({
      next: produits => {
        this.allProduits = produits;
        this.produits = produits;
        this.message = '';
      },
      error: () => {
        this.produits = [];
        this.message = 'Impossible de rechercher les makeups.';
      },
    });
  }

  private chargerProduits(): void {
    this.makeupService.listeMakeup().subscribe({
      next: produits => {
        this.allProduits = produits;
        this.produits = produits;
        this.message = '';
      },
      error: () => {
        this.produits = [];
        this.message = 'Impossible de charger les makeups.';
      },
    });
  }

  onKeyUp(filterText: string): void {
    const normalizedFilter = filterText.trim().toLowerCase();
    this.produits = normalizedFilter
      ? this.allProduits.filter(makeup =>
          (makeup.nom ?? '').toLowerCase().includes(normalizedFilter)
        )
      : this.allProduits;
  }

  formatDate(makeup: Makeup): string {
    const date = makeup.date_expiration ?? makeup.dateExpiration;
    return date ? String(date).substring(0, 10) : '-';
  }

  marqueName(marque: Marque | undefined): string {
    return marque?.nomMarque ?? 'PAS DE MARQUE';
  }
}
