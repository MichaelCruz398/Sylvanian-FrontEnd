import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { TarjetaComponent } from './pages/tarjeta/tarjeta.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { MisTarjetasComponent } from './pages/mis-tarjetas/mis-tarjetas.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { CambiarPasswordComponent } from './pages/cambiar-password/cambiar-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'registro', loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroComponent)},
  { path: 'tarjeta', component: TarjetaComponent},
  //  { path: 'tarjeta', component: TarjetaComponent, data: { animation: 'TarjetaPage' }},
  { path: 'admin', component: AdminComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'mis-tarjetas', component: MisTarjetasComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'cambiar-password', component: CambiarPasswordComponent }

];
