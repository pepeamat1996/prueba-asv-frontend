import { ChangeDetectorRef, Component } from '@angular/core';
import { Municipio, MunicipioService } from '../../services/municipio.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import {
  PrediccionTemperatura,
  PrediccionTemperaturaService,
} from '../../services/prediccion-temperatura.service';

@Component({
  selector: 'app-prevision-meteorologica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  templateUrl: './prevision-meteorologica.component.html',
  styleUrl: './prevision-meteorologica.component.css',
})
export class PrevisionMeteorologicaComponent {
  formControlMunicipio = new FormControl();
  formControlUnidTemp = new FormControl();
  listaMunicipios: any[] = [];
  municipiosFiltrados: Observable<any[]>;
  unidadTemp: any[] = [
    { id: 'G_CEL', nombre: 'ºC' },
    { id: 'G_FAH', nombre: 'ºF' },
  ];

  prediccion?: PrediccionTemperatura;
  fechaHoy = new Date();

  municipio!: Municipio;

  constructor(
    private municipioService: MunicipioService,
    private prediccionTemperaturaService: PrediccionTemperaturaService,
    private cdr: ChangeDetectorRef,
  ) {
    this.municipiosFiltrados = this.formControlMunicipio.valueChanges.pipe(
      startWith(''),
      map((value) => this.filtro(value)),
    );

    this.municipioService.obtenerMunicipios().subscribe((municipios: any) => {
      if (municipios) {
        this.listaMunicipios = municipios;
      }
    });
  }

  //Filtrado de los municipios cuando se introduce un filtro en el componente autocomplete
  private filtro(filtro: string | Municipio) {
    const valor = (
      typeof filtro === 'string' ? filtro : filtro.nombre
    ).toLowerCase();

    return this.listaMunicipios.filter((m) =>
      m.nombre.toLowerCase().includes(valor),
    );
  }

  //Función utilizada para cuando se selecciona el municipio, al ser un objeto, que no muestra [Object Object],
  // ya que a parte del nombre, también tiene el código
  mostrarNombreMunicipio(municipio: Municipio): string {
    return municipio?.nombre ?? '';
  }

  //Función para guardar el municipio seleccionado para realizar la petición de previsión meteorológica
  seleccionarMunicipio(event: MatAutocompleteSelectedEvent): void {
    this.municipio = event.option.value;
    this.cargarPrediccion();
  }

  cargarPrediccion(): void {
    const codigoMunicipio = this.municipio?.codigo;
    let unidadTemperatura = this.formControlUnidTemp.value?.id;

    // No hacemos la petición hasta tener el codigo del municipio
    if (!codigoMunicipio) {
      return;
    }

    //Si unidadTemperatura no viene informada, se pone por defecto G_CEL
    if (!unidadTemperatura) {
      unidadTemperatura = 'G_CEL';
    }

    this.prediccionTemperaturaService
      .obtenerPrediccionTemperatura(codigoMunicipio, unidadTemperatura)
      .subscribe((data) => {
        if (data) {
          this.prediccion = data;
          this.cdr.detectChanges(); //Para actualizar el componente después de cada nueva llamada
        }
      });
  }
}
