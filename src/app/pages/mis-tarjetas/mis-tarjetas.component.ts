import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mis-tarjetas',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './mis-tarjetas.component.html',
  styleUrls: ['./mis-tarjetas.component.scss']
})
export class MisTarjetasComponent {
  tarjetasCompletadas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5039/api/tarjetas/completadas').subscribe(data => {
      this.tarjetasCompletadas = data.map(t => ({
        ...t,
        miniatura: 'assets/images/tarjeta-llena.png',
        descarga: 'assets/images/tarjeta-freya.png'
      }));
    });
  }

  descargar(ruta: string): void {
    const link = document.createElement('a');
    link.href = ruta;
    link.download = 'tarjeta-llena.png';
    link.click();
  }
}
