import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modello } from './model';

@Injectable({
  providedIn: 'root'
})
export class ModelDataService {

  constructor(private http: HttpClient) { }

  insertModel(modello: Modello): Observable<object> {
    return this.http.post('http://127.0.0.1:3000/modello/inserisci', modello);
  }

  getModelById(id: number): Observable<object> {
    return this.http.get(`http://127.0.0.1:3000/modello/leggi-per-id/${id}`);
  }

  getModelByName(nome: string): Observable<object> {
    return this.http.get(`http://127.0.0.1:3000/modello/leggi-per-nome/${nome}`);
  }

  updateModel(modello: Modello): Observable<object> {
    return this.http.put('http://127.0.0.1:3000/modello/aggiorna', modello);
  }

  removeModel(id: number): Observable<object> {
    return this.http.delete(`http://127.0.0.1:3000/modello/rimuovi/${id}`);
  }

  getAllModels(): Observable<object> {
    return this.http.get('http://127.0.0.1:3000/modello/leggi-tutto');
  }

}
