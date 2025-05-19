import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class PremiosService {
  private apiUrl = 'https://localhost:44361/api/premios';

  constructor(private http: HttpClient) {}

 obtenerPremios() {
  return this.http.get<any[]>(`${this.apiUrl}/mis-premios`);
}

  // 🧍 Usuario solicita usar un premio
  solicitarUso(premioId: number) {
    return this.http.post(`${this.apiUrl}/solicitar-uso/${premioId}`, {});
  }

  // 🧑‍💼 Admin ve todas las solicitudes pendientes
  obtenerSolicitudes() {
    return this.http.get<any[]>(`${this.apiUrl}/solicitudes`);
  }

  // ✅ Admin aprueba un premio
  aprobarSolicitud(premioId: number) {
    return this.http.post(`${this.apiUrl}/aprobar/${premioId}`, {});
  }

  // ❌ Admin rechaza un premio
  rechazarSolicitud(premioId: number) {
    return this.http.post(`${this.apiUrl}/rechazar/${premioId}`, {});
  }
  obtenerAprobados() {
  return this.http.get<any[]>(`${this.apiUrl}/aprobados`);
}

}
