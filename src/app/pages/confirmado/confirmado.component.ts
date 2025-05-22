import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmado',
  imports: [],
  templateUrl: './confirmado.component.html',
  styleUrl: './confirmado.component.scss'
})
export class ConfirmadoComponent {

  constructor(public router: Router) {}

    volverAlLogin() {
  this.router.navigate(['/login']);
}
}
