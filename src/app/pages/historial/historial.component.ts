import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { PremiosService } from '../../services/premio.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
  premios: any[] = [];

  constructor(private premiosService: PremiosService) {}

  ngOnInit(): void {
    this.premiosService.obtenerHistorial().subscribe(res => {
      this.premios = res;
    });
  }
}
