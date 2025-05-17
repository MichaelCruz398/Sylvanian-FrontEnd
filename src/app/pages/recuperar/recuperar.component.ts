import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  imports: [CommonModule, FormsModule],
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent {
email = '';
mensaje = '';
error = '';

constructor(private http: HttpClient, private router: Router) {}

volverAlLogin() {
  this.router.navigate(['/login']);
}

recuperar() {
  this.mensaje = '';
  this.error = '';

  if (!this.email.includes('@')) {
    this.error = 'Por favor, ingresa un correo válido';
    return;
  }

  const payload = { email: this.email };

  this.http.post('https://localhost:5039/api/password/solicitar-recuperacion', payload, {
    headers: { 'Content-Type': 'application/json' }
  }).subscribe({
    next: () => {
      this.mensaje = 'Te enviamos un correo con el enlace para cambiar tu contraseña';
      this.email = '';
    },
    error: (err) => {
      console.error(err);
      this.error = 'Ocurrió un error al enviar el correo. Verifica que el correo esté registrado.';
    }
  });
}


}
