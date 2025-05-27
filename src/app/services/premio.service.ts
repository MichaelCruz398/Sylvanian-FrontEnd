import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class PremiosService {
  private apiUrl = 'https://rincon-api-csbxhshtcjbsgwbn.brazilsouth-01.azurewebsites.net/api/premios';

  constructor(private http: HttpClient) {}

 obtenerPremios() {
  return this.http.get<any[]>(`${this.apiUrl}/mis-premios`);
}

  solicitarUso(premioId: number) {
    return this.http.post(`${this.apiUrl}/solicitar-uso/${premioId}`, {});
  }

  obtenerSolicitudes() {
    return this.http.get<any[]>(`${this.apiUrl}/solicitudes`);
  }

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
