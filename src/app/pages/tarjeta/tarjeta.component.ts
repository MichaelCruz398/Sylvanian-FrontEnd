import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TarjetasService } from '../../services/tarjetas.service';
import { AuthService } from '../../services/auth.service';

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
  nombreUsuario: string = '';


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

  constructor(private http: HttpClient, private tarjetasService: TarjetasService, private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerStickers();
    this.cargarTarjetaActiva();
    this.nombreUsuario = this.authService.obtenerNombre();

  }

  cargarTarjetaActiva(): void {
    this.http.get<any>('https://localhost:44361/api/tarjetas/activa')
      .subscribe(tarjeta => {
        this.tarjetaId = tarjeta.id;
        this.pegarStickers(tarjeta.stickersPegados);
      });
  }

  obtenerStickers(): void {
    this.tarjetasService.obtenerStickersDisponibles().subscribe({
      next: (res) => {
        this.stickersDisponibles = res.cantidad;
      },
      error: () => {
        console.error('Error al obtener los stickers disponibles');
      }
    });
  }

  pegarStickers(cantidad: number): void {
    for (let i = 0; i < cantidad && i < this.espacios.length; i++) {
      this.espacios[i].ocupado = true;
      this.espacios[i].imagen = this.stickerURL;
    }
  }

  pegarSticker(): void {
  if (!this.tarjetaId || this.stickersDisponibles <= 0) return;

  this.tarjetasService.pegarSticker(this.tarjetaId).subscribe({
   next: (res: any) => {
  console.log('✅ Sticker pegado', res);
  this.obtenerStickers();

  // Espera un poquito a que se actualice y vuelva a cargar la tarjeta
  setTimeout(() => {
    this.cargarTarjetaActiva(); // volverá con la nueva tarjeta si se completó

    const pegados = this.espacios.filter(e => e.ocupado).length + 1;

    if (pegados >= 15) {
      alert("🎉 ¡Has completado tu tarjeta! Se ha generado una nueva.");
    }

    // Detectar si fue un premio
    const espacioPegado = this.espacios[pegados - 1];
    if (espacioPegado && espacioPegado.premio) {
      this.premioActual = this.obtenerDescuentoPorEspacio(espacioPegado.id);
      this.mostrarAnimacionPremio = true;
    }
  }, 500);
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
