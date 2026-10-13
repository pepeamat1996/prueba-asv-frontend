import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';

import { Saludo } from './services/saludo.service';

@Component({
    selector: 'app-root',
    imports: [],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private saludoService = inject(Saludo);

  mensaje = '';
  error = '';

  ngOnInit(): void {
    this.saludoService.obtenerSaludo().subscribe({
      next: (respuesta) => {
        this.mensaje = respuesta;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo conectar con el backend.';
      }
    });
  }
}
