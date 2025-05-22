import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userRol: 'admin' | 'cliente' = 'cliente';
  usuario = '';
  menuMobileAbierto = false;

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    const rol = localStorage.getItem('rol');
    const user = localStorage.getItem('nombre');

    if (rol === '2') {
      this.userRol = 'admin';
    } else {
      this.userRol = 'cliente';
    }

    this.usuario = user ?? '';
  }

  // ✅ Cambia estado del menú hamburguesa
  toggleMenuMobile() {
    this.menuMobileAbierto = !this.menuMobileAbierto;
  }

  // ✅ Cierra menú hamburguesa si cambia a pantalla grande
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768) {
      this.menuMobileAbierto = false;
    }
  }

cerrarSesion(): void {
  Swal.fire({
    title: '🚪 ¿Cerrar sesión?',
    html: `
      <p style="font-size: 1rem; color: #7a5a50; margin: 0;">
        ¿Estás seguro de que deseas <strong>cerrar sesión</strong>?
      </p>
    `,
    icon: 'warning',
    background: '#fffaf3',
    showCancelButton: true,
    confirmButtonColor: '#ffb6b9',
    cancelButtonColor: '#ccc',
    confirmButtonText: 'Sí, cerrar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'sweet-popup',
      title: 'sweet-title',
      confirmButton: 'sweet-btn'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  });
}

}
