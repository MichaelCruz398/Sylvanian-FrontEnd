import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  asignaciones: { [id: number]: number } = {};

  stickerAsignar = 1;
  busqueda = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.adminService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data
        .filter(u => u.rol === 1) // ← filtra solo los clientes
        .map(u => ({
          id: u.id,
          nombre: u.nombre,
          correo: u.email,
          stickers: u.stickers ?? 0
        }));

    });
  }


 asignarSticker(usuarioId: number): void {
  const usuario = this.usuarios.find(u => u.id === usuarioId);
  if (!usuario) return;

  Swal.fire({
    title: '🎟️ ¿Asignar sticker?',
    html: `
      <p style="font-size: 1rem; color: #7a5a50; margin: 0;">
        ¿Deseas asignar <strong>1 sticker</strong> a <strong>${usuario.nombre}</strong>?
      </p>
    `,
    icon: 'question',
    background: '#fffaf3',
    showCancelButton: true,
    confirmButtonColor: '#ffb6b9',
    cancelButtonColor: '#ccc',
    confirmButtonText: 'Sí, asignar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'sweet-popup',
      title: 'sweet-title',
      confirmButton: 'sweet-btn'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.adminService.asignarSticker(usuarioId).subscribe({
        next: () => {
          usuario.stickers += 1;

          Swal.fire({
            icon: 'success',
            title: '🎉 ¡Sticker asignado!',
            html: `
              <p style="font-size: 1rem; margin: 0;">
                Se asignó 1 sticker a <strong>${usuario.nombre}</strong>
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
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: '❌ Error',
            text: 'No se pudo asignar el sticker',
            background: '#fff0f0',
            confirmButtonColor: '#d33',
            customClass: {
              popup: 'sweet-popup',
              title: 'sweet-title',
              confirmButton: 'sweet-btn'
            }
          });
        }
      });
    }
  });
}
  usuariosFiltrados() {
    return this.usuarios.filter(u =>
      u.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }
}
