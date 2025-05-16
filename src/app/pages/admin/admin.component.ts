import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  stickerAsignar = 1;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.adminService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data.map(u => ({
        id: u.id,
        nombre: u.nombre,
        correo: u.email,
        stickers: 0 
      }));
    });
  }

  asignarSticker(usuarioId: number): void {
    this.adminService.asignarSticker(usuarioId).subscribe({
      next: () => {
        const usuario = this.usuarios.find(u => u.id === usuarioId);
        if (usuario) usuario.stickers += this.stickerAsignar;
        alert(`✅ Se asignaron ${this.stickerAsignar} sticker(s) a ${usuario?.nombre}`);
      },
      error: () => {
        alert('❌ No se pudo asignar el sticker');
      }
    });
  }
}
