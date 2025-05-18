import { Component } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouterOutlet
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { CargandoComponent } from './shared/cargando/cargando.component';
import { CargandoService } from './shared/cargando.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, CargandoComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  mostrarLayout = false;

  constructor(
    public router: Router,
    private authService: AuthService,
    private cargandoService: CargandoService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.cargandoService.mostrar(); // 👈 muestra loader
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.cargandoService.ocultar(); // 👈 oculta loader
        }, 400);

        const ocultarEn = ['/', '/registro', '/recuperar'];
        const estaLogueado = this.authService.estaAutenticado();
        this.mostrarLayout = estaLogueado && !ocultarEn.includes(this.router.url);
      }
    });
  }
}
