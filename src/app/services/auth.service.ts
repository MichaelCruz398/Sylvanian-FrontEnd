import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://rincon-api-csbxhshtcjbsgwbn.brazilsouth-01.azurewebsites.net/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(nombre: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { nombre, email, password });
  }

  guardarToken(token: string, rol: number, nombre: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol.toString());
    localStorage.setItem('nombre', nombre);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenerRol(): number {
    return parseInt(localStorage.getItem('rol') || '0');
  }

  cerrarSesion() {
    localStorage.clear();
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
    obtenerNombre(): string {
  return localStorage.getItem('nombre') || '';
}
}
