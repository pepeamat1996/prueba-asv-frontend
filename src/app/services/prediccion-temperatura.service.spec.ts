
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { PrediccionTemperaturaService } from './prediccion-temperatura.service';
import { environment } from '../../environments/environment';

describe('PrediccionTemperaturaService', () => {
  let service: PrediccionTemperaturaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(PrediccionTemperaturaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener la predicción de temperatura', () => {
    const prediccion = {
      mediaTemperatura: 25,
      unidadTemperatura: 'C',
      probPrecipitacion: [
        { periodo: 'Mañana', probabilidad: 20 },
        { periodo: 'Tarde', probabilidad: 40 },
      ],
    };

    service.obtenerPrediccionTemperatura('03001', 'C').subscribe((resultado) => {
      expect(resultado).toEqual(prediccion);
    });

    const request = httpMock.expectOne(
      (req) =>
        req.url ===
          environment.apiUrl + '/prediccion/obtenerPrediccionTemperatura' &&
        req.params.get('codigoMunicipio') === '03001' &&
        req.params.get('unidadTemperatura') === 'C',
    );

    expect(request.request.method).toBe('GET');

    request.flush(prediccion);
  });
});
