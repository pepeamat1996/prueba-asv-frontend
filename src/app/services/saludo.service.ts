
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Saludo {
  private http = inject(HttpClient);

  obtenerSaludo(): Observable<string> {
    return this.http.get(
      'http://localhost:8080/api/saludo',
      { responseType: 'text' }
    );
  }
}
