import { Marque } from './marque.model';

export class MarqueWrapper {
  embedded!: { marques: Marque[] };
}
