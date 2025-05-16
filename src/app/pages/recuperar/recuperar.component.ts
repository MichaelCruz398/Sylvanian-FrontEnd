import { HttpClient } from "@angular/common/http";

export class RecuperarComponent {
  email = '';
  enviado = false;

  constructor(private http: HttpClient) {}

  recuperar() {
    // Simulación de proceso
    this.enviado = true;
    alert('Si el correo existe, te enviaremos un enlace de recuperación');
  }
}
