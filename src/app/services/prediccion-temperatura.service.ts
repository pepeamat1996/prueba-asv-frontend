import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface PrediccionTemperatura {
  mediaTemperatura: number;
  unidadTemperatura: string;
  probPrecipitacion: ProbabilidadPrecipitacion[];
}

export interface ProbabilidadPrecipitacion {
  periodo: string;
  probabilidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class PrediccionTemperaturaService {
  constructor(private readonly http: HttpClient) {}

  private readonly url =
    environment.apiUrl + '/prediccion/obtenerPrediccionTemperatura';

  obtenerPrediccionTemperatura(
    codigoMunicipio: string,
    unidadTemperatura: string,
  ): Observable<PrediccionTemperatura> {
    return this.http.get<PrediccionTemperatura>(this.url, {
      params: {
        codigoMunicipio,
        unidadTemperatura,
      },
    });
  }
}
