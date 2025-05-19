import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = 'https://localhost:44361/api';

  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    return this.http.get<any[]>(`${this.apiUrl}/Usuarios/todos`);
  }

  asignarSticker(usuarioId: number) {
    return this.http.post(`${this.apiUrl}/tarjetas/asignar-sticker`, usuarioId);
  }
}
