import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { TarjetaComponent } from './pages/tarjeta/tarjeta.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { MisTarjetasComponent } from './pages/mis-tarjetas/mis-tarjetas.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'tarjeta', component: TarjetaComponent},
  //  { path: 'tarjeta', component: TarjetaComponent, data: { animation: 'TarjetaPage' }},
  { path: 'admin', component: AdminComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'mis-tarjetas', component: MisTarjetasComponent },
  { path: 'recuperar', component: RecuperarComponent },

];
