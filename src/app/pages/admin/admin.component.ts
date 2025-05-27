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
  usuariosFiltradosTotal: any[] = [];
  usuariosPaginados: any[] = [];

  paginaActual = 1;
  porPagina = 5;
  totalPaginas = 0;
  busqueda = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.adminService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data
        .filter(u => u.rol === 1)
        .map(u => ({
          id: u.id,
          nombre: u.nombre,
          correo: u.email,
          stickers: u.stickers ?? 0
        }));

      this.actualizarFiltroYPagina();
    });
  }

  actualizarFiltroYPagina(): void {
    this.paginaActual = 1; // Reinicia al buscar
    this.usuariosFiltradosTotal = this.usuarios.filter(u =>
      u.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
    this.totalPaginas = Math.ceil(this.usuariosFiltradosTotal.length / this.porPagina);
    this.actualizarPaginador();
  }

  actualizarPaginador(): void {
    const inicio = (this.paginaActual - 1) * this.porPagina;
    const fin = inicio + this.porPagina;
    this.usuariosPaginados = this.usuariosFiltradosTotal.slice(inicio, fin);
  }

  irPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarPaginador();
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  asignarSticker(usuarioId: number): void {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    if (!usuario) return;

    Swal.fire({
      title: '🎟️ ¿Asignar sticker?',
      html: `<p>¿Deseas asignar <strong>1 sticker</strong> a <strong>${usuario.nombre}</strong>?</p>`,
      icon: 'question',
      background: '#fffaf3',
      showCancelButton: true,
      confirmButtonColor: '#ffb6b9',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Sí, asignar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.asignarSticker(usuarioId).subscribe({
          next: () => {
            usuario.stickers += 1;
            this.actualizarPaginador();

            Swal.fire({
              icon: 'success',
              title: '🎉 ¡Sticker asignado!',
              html: `Se asignó 1 sticker a <strong>${usuario.nombre}</strong>`,
              background: '#fffaf3',
              confirmButtonColor: '#b3887b'
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: '❌ Error',
              text: 'No se pudo asignar el sticker',
              background: '#fff0f0',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }
}
