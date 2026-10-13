import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Saludo } from './services/saludo.service';

@Component({
    selector: 'app-root',
    imports: [CommonModule],
    templateUrl: './app.component.html',
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
