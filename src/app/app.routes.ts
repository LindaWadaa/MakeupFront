import { Routes } from '@angular/router';
import { Makeups } from './makeups/makeups';
import{AddMakeup} from './add-makeup/add-makeup';
import { UpdateMakeup } from './update-makeup/update-makeup';
import { RechercheParCategorie } from './recherche-par-categorie/recherche-par-categorie';

export const routes: Routes = [
  { path: 'makeups', component: Makeups },
  { path: 'add-makeup', component: AddMakeup },
  { path: 'update-makeup/:id', component: UpdateMakeup },
  { path: 'rechercheParCategorie', component: RechercheParCategorie },
  {path: '', redirectTo: '/makeups', pathMatch: 'full' }
];
