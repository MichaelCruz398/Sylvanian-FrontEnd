import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  mostrarLayout = false;
constructor(public router: Router, private authService: AuthService) {
  this.router.events.subscribe(() => {
    const ocultarEn = ['/', '/registro', '/recuperar'];
    const estaLogueado = this.authService.estaAutenticado();

    this.mostrarLayout = estaLogueado && !ocultarEn.includes(this.router.url);
  });
}
}

