import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { PremiosService } from '../../services/premio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  premios: any[] = [];
  premiosPaginados: any[] = [];
  paginaActual = 1;
  premiosPorPagina = 5;
  totalPaginas = 0;

  constructor(private premiosService: PremiosService) {}

  ngOnInit(): void {
    this.premiosService.obtenerPremios().subscribe({
      next: (res: any[]) => {
        this.premios = res.sort((a: any, b: any) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        this.actualizarPaginador();
      },
      error: (err: any) => {
        console.error('Error al cargar los premios:', err);
      }
    });
  }

  actualizarPaginador(): void {
    const inicio = (this.paginaActual - 1) * this.premiosPorPagina;
    const fin = inicio + this.premiosPorPagina;
    this.premiosPaginados = this.premios.slice(inicio, fin);
    this.totalPaginas = Math.ceil(this.premios.length / this.premiosPorPagina);
  }

  irPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarPaginador();
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  solicitarUso(premioId: number, descuento: number): void {
    Swal.fire({
      title: '¿Utilizar descuento?',
      text: `¿Deseas solicitar el uso de tu descuento del ${descuento}%?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, solicitar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.premiosService.solicitarUso(premioId).subscribe({
          next: () => {
            const premio = this.premios.find(p => p.id === premioId);
            if (premio) premio.enRevision = true;
            this.actualizarPaginador();
            Swal.fire({
              title: '✨ ¡Solicitud enviada!',
              html: `
                <p style="font-size: 1.1rem; color: #7a5a50; margin: 0;">
                  Tu solicitud de descuento del <strong>${descuento}%</strong> fue enviada con éxito.
                </p>
                <p style="font-size: 0.95rem; margin-top: 8px;">
                  Espera que el admin lo apruebe 🐰💌
                </p>
              `,
              background: '#fffaf3',
              confirmButtonText: 'Entendido 💖',
              confirmButtonColor: '#b3887b',
              width: 400
            });
          }
        });
      }
    });
  }
}
