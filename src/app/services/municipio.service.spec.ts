
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { MunicipioService } from './municipio.service';
import { environment } from '../../environments/environment';

describe('MunicipioService', () => {
  let service: MunicipioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(MunicipioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener los municipios', () => {
    const municipios = [
      { codigo: '03001', nombre: 'Alicante' },
      { codigo: '03014', nombre: 'Elche' },
    ];

    service.obtenerMunicipios().subscribe((resultado) => {
      expect(resultado).toEqual(municipios);
    });

    const request = httpMock.expectOne(
      environment.apiUrl + '/municipio/obtenerMunicipios',
    );

    expect(request.request.method).toBe('GET');

    request.flush(municipios);
  });
});
