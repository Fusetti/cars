import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from './brand';

@Injectable({
  providedIn: 'root'
})
export class BrandDataService {

  constructor(private http: HttpClient) { }

  insertBrand(marca: Marca): Observable<object> {
    return this.http.post('http://127.0.0.1:3000/marca/inserisci', marca);
  }

  getBrandById(id: number): Observable<object> {
    return this.http.get(`http://127.0.0.1:3000/marca/leggi-per-id/${id}`);
  }

  getBrandByName(nome: string): Observable<object> {
    return this.http.get(`http://127.0.0.1:3000/marca/leggi-per-nome/${nome}`);
  }

  updateBrand(marca: Marca): Observable<object> {
    return this.http.put('http://127.0.0.1:3000/marca/aggiorna', marca);
  }

  removeBrand(id: number): Observable<object> {
    return this.http.delete(`http://127.0.0.1:3000/marca/rimuovi/${id}`);
  }

  getAllBrands(): Observable<object> {
    return this.http.get('http://127.0.0.1:3000/marca/leggi-tutto');
  }

}
