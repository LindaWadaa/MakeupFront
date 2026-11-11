import { Routes } from '@angular/router';
import { Makeups } from './makeups/makeups';
import{AddMakeup} from './add-makeup/add-makeup';
import { UpdateMakeup } from './update-makeup/update-makeup';
import { RechercheParMarque } from './recherche-par-marque/recherche-par-marque';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { ListeMarques } from './liste-marques/liste-marques';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { adminGuard } from './guards/admin.guard';
import { Profile } from './profile/profile';

export const routes: Routes = [
  { path: 'makeups', component: Makeups },
  { path: 'add-makeup', component: AddMakeup, canActivate: [adminGuard] },
  { path: 'update-makeup/:id', component: UpdateMakeup, canActivate: [adminGuard] },
  { path: 'rechercheParMarque', component: RechercheParMarque },
  { path: 'rechercheParNom', component: RechercheParNom },
  { path: 'listeMarques', component: ListeMarques, canActivate: [adminGuard] },
  { path: 'login', component: Login },
  { path: 'forbidden', component: Forbidden },
  { path: 'profile', component: Profile },
  {path: '', redirectTo: '/makeups', pathMatch: 'full' }
];
