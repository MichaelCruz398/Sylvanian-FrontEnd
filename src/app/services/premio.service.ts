import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class PremiosService {
  private apiUrl = 'http://localhost:5039/api';

  constructor(private http: HttpClient) {}

  obtenerHistorial() {
    return this.http.get<any[]>(`${this.apiUrl}/premios/mis-premios`);
  }
}
