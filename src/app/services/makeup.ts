import { Injectable } from '@angular/core';
import { Makeup as MakeupModel } from '../model/makeup.model';
import { Marque } from '../model/marque.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Makeup {

  apiURL = environment.apiURL;
  makeups!: MakeupModel[];
  private readonly marquesOfficielles: Record<number, Marque> = {
    1: { id: 1, nom: 'Dior', description: 'Marque française de maquillage' },
    2: { id: 2, nom: 'Essence', description: 'Marque de maquillage accessible' },
    3: { id: 3, nom: 'Chanel', description: 'Maison française de luxe' },
    4: { id: 4, nom: 'Maybelline', description: 'Marque de maquillage' },
    5: { id: 5, nom: 'MAC', description: 'Marque professionnelle de maquillage' },
    6: { id: 6, nom: 'Huda Beauty', description: 'Marque de maquillage' },
    7: { id: 7, nom: "L'Oreal Paris", description: 'Marque de beauté' },
    8: { id: 8, nom: 'Fenty Beauty', description: 'Marque de maquillage' },
    9: { id: 9, nom: 'NARS', description: 'Marque de maquillage' },
    10: {
      id: 10,
      nom: 'Anastasia Beverly Hills',
      description: 'Marque de maquillage',
    },
  };

  constructor(private http: HttpClient) {}

  listeMakeup(): Observable<MakeupModel[]>{
    return this.http.get<MakeupModel[]>(`${this.apiURL}/allmakeups`).pipe(
      map(makeups => makeups.map(makeup => this.normaliserMakeup(makeup))),
    );
  }

  ajouterMakeup( makeup: MakeupModel) :Observable<MakeupModel>{
    return this.http.post<MakeupModel>(`${this.apiURL}/addmakeup`, makeup);
  }

  getMakeup(id: number): MakeupModel | undefined {
    return this.makeups.find(makeup => makeup.id === id);
  }

  consulterMakeup(id: number): Observable<MakeupModel> {
    const url = `${this.apiURL}/getmakeup/${id}`;
    return this.http.get<MakeupModel>(url).pipe(
      map(makeup => this.normaliserMakeup(makeup)),
    );
  }

  updateMakeup(makeup: MakeupModel): Observable<MakeupModel>
  {
    return this.http.put<MakeupModel>(`${this.apiURL}/updatemakeup`, makeup);
  }

  supprimerMakeup(id : number) {
    const url = `${this.apiURL}/deletemakeup/${id}`;
    return this.http.delete(url);
  }

  listeMarques(): Observable<Marque[]> {
    return this.http.get<Marque[]>(`${this.apiURL}/marque/all`).pipe(
      map(marques => marques.map(marque => this.normaliserMarque(marque))),
    );
  }

  ajouterMarque(marque: Marque): Observable<Marque> {
    return this.http.post<Marque>(`${this.apiURL}/marque/add`, marque);
  }

  modifierMarque(marque: Marque): Observable<Marque> {
    return this.http.put<Marque>(`${this.apiURL}/marque/update`, marque);
  }

  private normaliserMarque(marque: Marque): Marque {
    const id = marque.id ?? marque.idMarque ?? marque.idmarque;
    const officielle = id === undefined ? undefined : this.marquesOfficielles[id];

    return {
      ...marque,
      id,
      nom: marque.nom ?? marque.nomMarque ?? marque.nommarque ?? officielle?.nom,
      description:
        marque.description ??
        marque.descriptionMarque ??
        marque.descriptionmarque ??
        officielle?.description,
    };
  }

  rechercherParMarque(idMarque: number): Observable<MakeupModel[]> {
    const url = `${this.apiURL}/getmakeupbymarque/${idMarque}`;
    return this.http.get<MakeupModel[]>(url).pipe(
      map(makeups =>
        makeups.map(makeup => ({
          ...makeup,
          marque: makeup.marque ? this.normaliserMarque(makeup.marque) : undefined,
        })),
      ),
    );
  }

  rechercherParNom(nom: string): Observable<MakeupModel[]> {
    const url = `${this.apiURL}/getmakeupbyname/${encodeURIComponent(nom)}`;
    return this.http.get<MakeupModel[]>(url).pipe(
      map(makeups => makeups.map(makeup => this.normaliserMakeup(makeup))),
    );
  }

  private normaliserMakeup(makeup: MakeupModel): MakeupModel {
    return {
      ...makeup,
      marque: makeup.marque ? this.normaliserMarque(makeup.marque) : undefined,
    };
  }

}
