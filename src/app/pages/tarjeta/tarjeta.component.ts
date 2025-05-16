import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Espacio {
  id: number;
  ocupado: boolean;
  premio: boolean;
  imagen: string;
  texto: string;
}

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss']
})
export class TarjetaComponent implements OnInit {
  tarjetaGirada = false;
  startX = 0;
  stickerURL = 'assets/images/sticker.png';
  mostrarPopup = false;
  mostrarAnimacionPremio = false;
  premioActual = 0;
  stickersDisponibles = 0;
  tarjetaId!: number;

  espacios: Espacio[] = Array.from({ length: 15 }, (_, i) => {
    const id = i + 1;
    let texto = '';

    if (id === 3 || id === 6) texto = '10%';
    if (id === 9 || id === 12) texto = '15%';
    if (id === 15) texto = '20%';
    if (id === 6) texto = 'REGALO\nSORPRESA';

    return {
      id,
      ocupado: false,
      premio: id % 3 === 0,
      imagen: '',
      texto
    };
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarTarjetaActiva();
    this.obtenerStickersDisponibles();
  }

  cargarTarjetaActiva(): void {
    this.http.get<any>('http://localhost:5039/api/tarjetas/activa')
      .subscribe(tarjeta => {
        this.tarjetaId = tarjeta.id;
        this.pegarStickers(tarjeta.stickersPegados);
      });
  }

  obtenerStickersDisponibles(): void {
    this.http.get<any>('http://localhost:5039/api/tarjetas/mis-stickers')
      .subscribe(res => {
        this.stickersDisponibles = res.cantidad;
      });
  }

  pegarStickers(cantidad: number): void {
    for (let i = 0; i < cantidad && i < this.espacios.length; i++) {
      this.espacios[i].ocupado = true;
      this.espacios[i].imagen = this.stickerURL;
    }
  }

  pegarSticker(index: number): void {
    const espacio = this.espacios[index];
    const primerLibre = this.espacios.findIndex(e => !e.ocupado);

    if (index !== primerLibre || this.stickersDisponibles <= 0) return;

    this.http.post('http://localhost:5039/api/tarjetas/pegar-sticker', this.tarjetaId)
      .subscribe(() => {
        espacio.ocupado = true;
        espacio.imagen = this.stickerURL;
        this.stickersDisponibles--;

        const celda = document.getElementById(`espacio-${espacio.id}`);
        if (celda) {
          celda.classList.add('animado');
          setTimeout(() => celda.classList.remove('animado'), 500);
        }

        if (espacio.premio) {
          this.premioActual = this.obtenerDescuentoPorEspacio(espacio.id);
          this.mostrarAnimacionPremio = true;
        }
      });
  }

  obtenerDescuentoPorEspacio(id: number): number {
    switch (id) {
      case 3:
      case 6:
        return 10;
      case 9:
      case 12:
        return 15;
      case 15:
        return 20;
      default:
        return 0;
    }
  }

  startDrag(event: MouseEvent | TouchEvent): void {
    this.startX = this.getClientX(event);
  }

  endDrag(event: MouseEvent | TouchEvent): void {
    const endX = this.getClientX(event);
    const deltaX = endX - this.startX;
    if (Math.abs(deltaX) > 50) {
      this.tarjetaGirada = !this.tarjetaGirada;
    }
  }

  getClientX(event: MouseEvent | TouchEvent): number {
    return event instanceof TouchEvent
      ? event.changedTouches[0].clientX
      : event.clientX;
  }

  cerrarAnimacionPremio(): void {
    this.mostrarAnimacionPremio = false;
  }
}
