import { Injectable } from '@angular/core';
import { Makeup as MakeupModel } from '../model/makeup.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};



@Injectable({
  providedIn: 'root',
})
export class Makeup {

  apiURL = environment.apiURL;
  makeups!: MakeupModel[];

  //categories: Categorie[];

  constructor(private http: HttpClient) {
    //console.log('creation du service makeup!');


    /* this.categories = [
      {idCat: 1, nomCat: 'Rouge à lèvres', descriptionCat: 'Rouge à lèvres rouge'},
      {idCat: 2, nomCat: 'Fond de teint', descriptionCat: 'Fond de teint liquide'},
      {idCat: 3, nomCat: 'Mascara', descriptionCat: 'Mascara volumisant'},
      {idCat: 4, nomCat: 'Blush', descriptionCat: 'Blush poudre rose'},
      {idCat: 5, nomCat: 'Eyeliner', descriptionCat: 'Eyeliner liquide noir'},
    ]; */

   /* this.makeups = [
      {id: 1, nom: 'Rouge à lèvres', description: 'Rouge à lèvres rouge', price: 15.99, marque: 1, date_expiration: new Date('2025-12-31')},
      {id: 2, nom: 'Fond de teint', description: 'Fond de teint liquide', price: 29.99, marque: 2, date_expiration: new Date('2024-06-30')},
      {id: 3, nom: 'Mascara', description: 'Mascara volumisant', price: 19.99, marque: 1, date_expiration: new Date('2023-09-30')},
      {id: 4, nom: 'Blush', description: 'Blush poudre rose', price: 12.99, marque: 3, date_expiration: new Date('2025-03-31')},
      {id: 5, nom: 'Eyeliner', description: 'Eyeliner liquide noir', price: 14.99, marque: 2, date_expiration: new Date('2024-11-30')},
    ];*/
  }




  listeMakeup(): Observable<MakeupModel[]>{
    return this.http.get<MakeupModel[]>(`${this.apiURL}/all`);
  }

  



  ajouterMakeup( makeup: MakeupModel) :Observable<MakeupModel>{
    return this.http.post<MakeupModel>(this.apiURL, makeup, httpOptions);
  }



  getMakeup(id: number): MakeupModel | undefined {
    return this.makeups.find(makeup => makeup.id === id);
  }






  consulterMakeup(id: number): Observable<MakeupModel> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<MakeupModel>(url);
}







  updateMakeup(makeup: MakeupModel): Observable<MakeupModel>
  {
  return this.http.put<MakeupModel>(this.apiURL, makeup, httpOptions);

  }


  supprimerMakeup(id : number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
}







  listeCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiURL}/cat`);
  }

  rechercherParCategorie(idCat: number): Observable<MakeupModel[]> {
    const url = `${this.apiURL}/prodscat/${idCat}`;
    return this.http.get<MakeupModel[]>(url);
  }

/*consulterCategorie(id:number): Categorie{

  return this.categories.find(cat => cat.idCat == id) !;
} */



}
