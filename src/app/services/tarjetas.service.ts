import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarjetasService {
  private apiUrl = 'https://rincon-api-csbxhshtcjbsgwbn.brazilsouth-01.azurewebsites.net/api/tarjetas';

  constructor(private http: HttpClient) { }

  obtenerStickersDisponibles() {
    return this.http.get<{ cantidad: number }>(`${this.apiUrl}/mis-stickers`);
  }
  pegarSticker(tarjetaId: number) {
    return this.http.post('https://rincon-api-csbxhshtcjbsgwbn.brazilsouth-01.azurewebsites.net/api/tarjetas/pegar-sticker', tarjetaId,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
