import { Component, OnInit } from '@angular/core';
import { PremiosService } from '../../services/premio.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-descuento',
  standalone: true,
  imports: [CommonModule], // 👈 esto es lo que necesitas
  templateUrl: './solicitudes-descuento.component.html',
  styleUrls: ['./solicitudes-descuento.component.scss']
})

export class SolicitudesDescuentoComponent implements OnInit {
  solicitudes: any[] = [];
  aprobados: any[] = [];

  constructor(private premiosService: PremiosService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
    this.cargarAprobados();
  }

  cargarSolicitudes() {
    this.premiosService.obtenerSolicitudes().subscribe({
      next: (res) => {
        this.solicitudes = res;
      },
      error: () => {
        alert('Error al cargar solicitudes');
      }
    });
  }

  cargarAprobados() {
    this.premiosService.obtenerAprobados().subscribe({
      next: (res) => {
        this.aprobados = res;
      },
      error: () => {
        alert('Error al cargar aprobados');
      }
    });
  }

 aprobar(id: number, nombreUsuario: string) {
  Swal.fire({
    title: '📝 ¿Aprobar solicitud?',
    html: `
      <p style="font-size: 1rem; color: #7a5a50; margin: 0;">
        ¿Estás seguro de aprobar el descuento para <strong>${nombreUsuario}</strong>?
      </p>
    `,
    icon: 'question',
    background: '#fffaf3',
    showCancelButton: true,
    confirmButtonText: 'Sí, aprobar 💖',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#a5dc86',
    cancelButtonColor: '#e2bdbd',
    customClass: {
      popup: 'sweet-popup',
      title: 'sweet-title',
      confirmButton: 'sweet-btn'
    }
  }).then(result => {
    if (result.isConfirmed) {
      this.premiosService.aprobarSolicitud(id).subscribe(() => {
        this.cargarSolicitudes();
        this.cargarAprobados();

        Swal.fire({
          icon: 'success',
          title: '✅ ¡Solicitud aprobada!',
          html: `
            <p style="font-size: 1rem; margin: 0;">
              El descuento para <strong>${nombreUsuario}</strong> ha sido aprobado.
            </p>
          `,
          background: '#fffaf3',
          confirmButtonColor: '#b3887b',
          customClass: {
            popup: 'sweet-popup',
            title: 'sweet-title',
            confirmButton: 'sweet-btn'
          }
        });
      });
    }
  });
}
rechazar(id: number) {
  Swal.fire({
    title: '🚫 ¿Rechazar solicitud?',
    html: `
      <p style="font-size: 1rem; color: #7a5a50; margin: 0;">
        Esta acción no se puede deshacer.<br>
        ¿Estás seguro de rechazar la solicitud?
      </p>
    `,
    icon: 'warning',
    background: '#fffaf3',
    showCancelButton: true,
    confirmButtonText: 'Sí, rechazar 💔',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ff6f6f',
    cancelButtonColor: '#ccc',
    customClass: {
      popup: 'sweet-popup',
      title: 'sweet-title',
      confirmButton: 'sweet-btn'
    }
  }).then(result => {
    if (result.isConfirmed) {
      this.premiosService.rechazarSolicitud(id).subscribe(() => {
        this.cargarSolicitudes();

        Swal.fire({
          icon: 'info',
          title: 'Solicitud rechazada',
          html: `
            <p style="font-size: 1rem; margin: 0;">
              La solicitud fue rechazada correctamente.
            </p>
          `,
          background: '#fffaf3',
          confirmButtonColor: '#b3887b',
          customClass: {
            popup: 'sweet-popup',
            title: 'sweet-title',
            confirmButton: 'sweet-btn'
          }
        });
      });
    }
  });
}

}