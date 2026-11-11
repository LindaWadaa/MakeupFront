import { Marque } from './marque.model';

export class Makeup {
  id?: number;
  date_expiration?: Date | string;
  dateExpiration?: Date | string;
  description?: string;
  marque?: Marque;
  nom?: string;
  price?: number;
}