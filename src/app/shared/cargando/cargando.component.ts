import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 necesario para pipes
import { CargandoService } from '../cargando.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cargando',
  standalone: true,
  imports: [CommonModule], // 👈 aquí lo agregas
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss']
})
export class CargandoComponent {
  visible$: Observable<boolean>;

  constructor(private cargandoService: CargandoService) {
    this.visible$ = this.cargandoService.cargando$;
  }
}
