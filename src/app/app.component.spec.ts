import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import { CargandoService } from './shared/cargando.service';
import { CargandoComponent } from './shared/cargando/cargando.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, CargandoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mostrarLayout = true;

  constructor(private router: Router, private cargandoService: CargandoService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.cargandoService.mostrar();

        const ruta = event.url;
        this.mostrarLayout = !['/login', '/registro', '/recuperar', '/cambiar-password'].includes(ruta);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.cargandoService.ocultar();
      }
    });
  }
}
