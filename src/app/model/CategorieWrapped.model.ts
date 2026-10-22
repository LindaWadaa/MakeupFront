import { Categorie } from './categorie.model';


export class CategorieWrapper{
embedded !: { categories: Categorie[]};
}