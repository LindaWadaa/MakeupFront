import { Marque } from './marque.model';
import { Image } from './image.model';

export class Makeup {
  id?: number;
  date_expiration?: Date | string;
  dateExpiration?: Date | string;
  description?: string;
  marque?: Marque;
  nom?: string;
  price?: number;
  image?: Image;
  imageStr?: string;
  images?: Image[];
  imagePath?: string;
}