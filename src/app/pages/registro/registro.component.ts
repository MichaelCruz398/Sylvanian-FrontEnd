import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private router: Router) {}

  registrar(): void {
    if (!this.email || !this.password || !this.nombre) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    alert('¡Registro exitoso! Bienvenido 😊');
    this.router.navigate(['/tarjeta']);
  }
}
