import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Municipio {
  codigo: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = environment.apiUrl + '/municipio/obtenerMunicipios';

  obtenerMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.url);
  }
}
