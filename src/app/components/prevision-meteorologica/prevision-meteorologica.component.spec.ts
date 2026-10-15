
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PrevisionMeteorologicaComponent } from './prevision-meteorologica.component';
import { MunicipioService } from '../../services/municipio.service';
import { PrediccionTemperaturaService } from '../../services/prediccion-temperatura.service';

describe('PrevisionMeteorologicaComponent', () => {
  let component: PrevisionMeteorologicaComponent;

  const municipioServiceMock = {
    obtenerMunicipios: jest.fn().mockReturnValue(of([
      { codigo: '03001', nombre: 'Alicante' },
      { codigo: '03014', nombre: 'Elche' },
    ])),
  };

  const prediccionServiceMock = {
    obtenerPrediccionTemperatura: jest.fn().mockReturnValue(of({
      mediaTemperatura: 25,
      unidadTemperatura: 'G_CEL',
      probPrecipitacion: [],
    })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevisionMeteorologicaComponent],
      providers: [
        { provide: MunicipioService, useValue: municipioServiceMock },
        {
          provide: PrediccionTemperaturaService,
          useValue: prediccionServiceMock,
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(PrevisionMeteorologicaComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los municipios al inicializarse', () => {
    expect(component.listaMunicipios).toEqual([
      { codigo: '03001', nombre: 'Alicante' },
      { codigo: '03014', nombre: 'Elche' },
    ]);
  });

  it('debería cargar la predicción del municipio seleccionado', () => {
    component.municipio = { codigo: '03001', nombre: 'Alicante' };

    component.cargarPrediccion();

    expect(
      prediccionServiceMock.obtenerPrediccionTemperatura,
    ).toHaveBeenCalledWith('03001', 'G_CEL');

    expect(component.prediccion).toEqual({
      mediaTemperatura: 25,
      unidadTemperatura: 'G_CEL',
      probPrecipitacion: [],
    });
  });
});
