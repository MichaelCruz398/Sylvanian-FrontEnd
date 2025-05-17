import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.scss']
})
export class CambiarPasswordComponent implements OnInit {
  password = '';
  confirmPassword = '';
  token = '';
  mensaje = '';
  error = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

 ngOnInit(): void {
  this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
  console.log("🔐 Token capturado de la URL:", this.token);
}

  cambiarPassword() {
    this.error = '';
    this.mensaje = '';

    if (!this.password || !this.confirmPassword) {
      this.error = 'Debes ingresar y confirmar la nueva contraseña';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    const body = {
      token: this.token,
      nuevaPassword: this.password
    };

    this.http.post('https://localhost:44361/api/password/cambiar-password', body, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: () => {
        this.mensaje = '¡Contraseña actualizada con éxito!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (err) => {
        console.error(err);
        this.error = 'El token es inválido o expiró. Solicita una nueva recuperación.';
      }
    });
  }
}
