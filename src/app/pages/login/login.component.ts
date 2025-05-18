import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CargandoComponent } from '../../shared/cargando/cargando.component';

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

  constructor(private authService: AuthService, public router: Router) { }


  iniciarSesion() {
    this.cargando = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.cargando = false;
        this.authService.guardarToken(res.token, res.rol, res.nombre);
        this.errorMessage = '';

        if (res.rol === 2) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/tarjeta']);
        }
      },
      error: () => {
        this.cargando = false;
        this.errorMessage = 'Correo o contraseña inválidos';
      },
      complete: () => {
        this.cargando = false
      }
    });
  }
}
