import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CargandoComponent } from '../../shared/cargando/cargando.component';
import { CargandoService } from '../../shared/cargando.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CargandoComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    public router: Router,
    private cargandoService: CargandoService
  ) {
    this.cargandoService.cargando$.subscribe(valor => {
      this.cargando = valor;
    });
  }

 iniciarSesion() {
  this.errorMessage = '';

  if (!this.email || !this.password) {
    this.errorMessage = 'Debes ingresar tu usuario/correo y contraseña.';
    return;
  }

  this.cargandoService.mostrar();

  this.authService.login(this.email, this.password).subscribe({
    next: (res: any) => {
      this.authService.guardarToken(res.token, res.rol, res.nombre);
      this.errorMessage = '';
      this.cargandoService.ocultar(); // ✅ aseguramos ocultar carga

      if (res.rol === 2) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/tarjeta']);
      }
    },
    error: (err) => {
      this.cargandoService.ocultar(); // ✅ también aquí
      if (err.error?.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = 'Correo o contraseña inválidos';
      }
    }
    // No uses complete aquí, no se ejecuta si hay error
  });
}

  onInputChange(): void {
    this.errorMessage = '';
  }
}
