import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = 'http://localhost:5039/api';

  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/todos`);
  }

  asignarSticker(usuarioId: number) {
    return this.http.post(`${this.apiUrl}/tarjetas/asignar-sticker`, usuarioId);
  }
}
