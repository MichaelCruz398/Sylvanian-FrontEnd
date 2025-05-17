import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; 


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  mensaje = '';

constructor(public router: Router, private authService: AuthService) {}

registrar(): void {
  if (!this.email || !this.password || !this.nombre) {
    this.error = 'Todos los campos son obligatorios';
    return;
  }

  if (this.password !== this.confirmPassword) {
    this.error = 'Las contraseñas no coinciden';
    return;
  }

  const nuevoUsuario = {
    nombre: this.nombre,
    email: this.email,
    password: this.password
  };


  this.authService.register(this.nombre, this.email, this.password).subscribe({
    next: (res: any) => {
      alert('¡Registro exitoso! Bienvenido 😊');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error(err);
      this.error = 'Error al registrar. Intenta nuevamente.';
    }
  });
}
  volverAlLogin() {
  this.router.navigate(['/login']);
}

}
