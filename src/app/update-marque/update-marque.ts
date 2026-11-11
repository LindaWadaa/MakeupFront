import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-update-marque',
  imports: [FormsModule],
  templateUrl: './update-marque.html',
})
export class UpdateMarque {
  @Input() marque: Marque = { id: undefined, nom: '', description: '' };
  @Input() ajout = true;
  @Output() marqueUpdated = new EventEmitter<Marque>();

  saveMarque(): void {
    const nom = this.marque.nom?.trim();
    if (!nom) {
      return;
    }

    this.marqueUpdated.emit({
      ...this.marque,
      nom,
      description: this.marque.description?.trim() ?? '',
    });
  }
}
