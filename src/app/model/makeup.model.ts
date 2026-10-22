import { Categorie } from "./categorie.model";

export class Makeup {
  id?: number;
  date_expiration?: Date | string;
  dateExpiration?: Date | string;
  description?: string;
  marque?: number;
  nom?: string;
  price?: number;
  categorie!: Categorie;
}

//je peux mettre aussi interface au lieux de class