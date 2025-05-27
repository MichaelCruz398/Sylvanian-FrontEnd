import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TarjetasService } from '../../services/tarjetas.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
  premioActual: string = '';
  stickersDisponibles = 0;
  tarjetaId!: number;
  nombreUsuario: string = '';
  esMovil: boolean = false;
  pegandoSticker: boolean = false;

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

  constructor(
    private http: HttpClient,
    private tarjetasService: TarjetasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.esMovil = window.innerWidth <= 768;
    this.obtenerStickers();
    this.cargarTarjetaActiva();
    this.nombreUsuario = this.authService.obtenerNombre();

    window.addEventListener('resize', () => {
      this.esMovil = window.innerWidth <= 768;
    });
  }

  cargarTarjetaActiva(): void {
    this.http.get<any>('https://localhost:44361/api/tarjetas/activa').subscribe(tarjeta => {
      this.tarjetaId = tarjeta.id;
      this.pegarStickers(tarjeta.stickersPegados);
    });
  }

  obtenerStickers(): void {
    this.tarjetasService.obtenerStickersDisponibles().subscribe({
      next: (res) => {
        this.stickersDisponibles = res.cantidad;
      },
      error: () => {}
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

    this.pegandoSticker = true;

    console.log('Pegando sticker en tarjeta ID:', this.tarjetaId); // ✅ depuración

    this.tarjetasService.pegarSticker(this.tarjetaId).subscribe({
      next: () => {
        this.obtenerStickers();

        const pegados = this.espacios.filter(e => e.ocupado).length;
        const nuevoIndex = pegados;

        if (nuevoIndex < this.espacios.length) {
          this.espacios[nuevoIndex].ocupado = true;
          this.espacios[nuevoIndex].imagen = this.stickerURL;
        }

        const espacioPegado = this.espacios[nuevoIndex];

        if (espacioPegado?.premio) {
          this.premioActual = this.obtenerPremioPorEspacio(espacioPegado.id);
          this.mostrarAnimacionPremio = true;
        }

        setTimeout(() => {
          if (nuevoIndex + 1 >= 15) {
            setTimeout(() => {
              Swal.fire({
                title: '🎉 ¡Tarjeta completada!',
                text: 'Has llenado todos los espacios y se ha generado una nueva tarjeta para ti 🥳',
                icon: 'success',
                confirmButtonText: '¡Genial!',
                confirmButtonColor: '#b3887b',
                background: '#fffaf3',
              });
            }, 300);
          }

          this.cargarTarjetaActiva();
          this.pegandoSticker = false;
        }, 1500);
      },
      error: () => {
        this.pegandoSticker = false;
      }
    });
  }

  obtenerPremioPorEspacio(id: number): string {
    switch (id) {
      case 3:
        return '10% de descuento';
      case 6:
        return '¡Accesorio sorpresa!';
      case 9:
      case 12:
        return '15% de descuento';
      case 15:
        return '20% de descuento';
      default:
        return '';
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
