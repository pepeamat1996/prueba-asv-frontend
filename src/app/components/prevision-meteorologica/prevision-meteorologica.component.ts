import { Component } from '@angular/core';
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

  constructor(private municipioService: MunicipioService) {
    this.municipiosFiltrados = this.formControlMunicipio.valueChanges.pipe(
      startWith(''),
      map((value) => this.filtro(value)),
    );

    this.municipioService.obtenerMunicipios().subscribe((municipios: any) => {
      this.listaMunicipios = municipios;
    });
  }

  private filtro(filtro: string | Municipio) {
    const valor = (
      typeof filtro === 'string' ? filtro : filtro.nombre
    ).toLowerCase();

    return this.listaMunicipios.filter((m) =>
      m.nombre.toLowerCase().includes(valor),
    );
  }

  mostrarNombreMunicipio(municipio: Municipio): string {
    return municipio?.nombre ?? '';
  }

  seleccionarMunicipio(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    const municipio = event.option.value;

    console.log('Municipio seleccionado:', municipio);
    console.log('Código:', municipio.codigo);
    console.log('Nombre:', municipio.nombre);
  }
}
