import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargandoService {
  private cargandoSubject = new BehaviorSubject<boolean>(false);
  public cargando$ = this.cargandoSubject.asObservable();

mostrar() {
  this.cargandoSubject.next(true);
}

ocultar() {
  this.cargandoSubject.next(false);
}

}
