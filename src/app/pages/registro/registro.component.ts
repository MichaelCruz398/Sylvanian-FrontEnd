import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CargandoComponent } from '../../shared/cargando/cargando.component';
import { CargandoService } from '../../shared/cargando.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, CargandoComponent],
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
  cargando = false;

  constructor(
    public router: Router,
    private authService: AuthService,
    private cargandoService: CargandoService
  ) {
    this.cargandoService.cargando$.subscribe(valor => {
      this.cargando = valor;
    });
  }

  registrar(): void {
    this.error = '';
    this.mensaje = '';
    this.cargandoService.mostrar();

    // Validaciones básicas
    if (!this.nombre || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Todos los campos son obligatorios.';
      this.cargandoService.ocultar();
      return;
    }

    if (!this.validarEmail(this.email)) {
      this.error = 'El correo no es válido.';
      this.cargandoService.ocultar();
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      this.cargandoService.ocultar();
      return;
    }

    this.authService.register(this.nombre, this.email, this.password).subscribe({
      next: () => {
        this.cargandoService.ocultar();
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Bienvenida a Rincón Sylvanian 🐰✨',
          icon: 'success',
          confirmButtonColor: '#e69bbf',
          confirmButtonText: 'Ir al inicio',
          background: '#fffaf3',
          customClass: {
            popup: 'rounded-4'
          }
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        this.cargandoService.ocultar();

        if (err.error?.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Error al registrar. Intenta nuevamente.';
        }
      }
    });
  }

  validarEmail(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  volverAlLogin() {
    this.router.navigate(['/login']);
  }
}
