import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userRol: 'admin' | 'cliente' = 'cliente';
  usuario = 'cliente@rincon.cl';
  menuAbierto = false;

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

  constructor(private router: Router, public auth: AuthService) { }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
