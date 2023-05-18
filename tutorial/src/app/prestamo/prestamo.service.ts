import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prestamo } from './model/Prestamo';
import { HttpClient } from '@angular/common/http';
import { PrestamoPage } from './model/PrestamoPage';
import { Pageable } from '../core/model/page/Pageable';
import { Game } from 'src/app/game/model/Game';



@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
 
  constructor(
    private http: HttpClient

  ) { }

  getPrestamos(pageable: Pageable): Observable<PrestamoPage> {
    return this.http.post<PrestamoPage>('http://localhost:8080/prestamo', { pageable: pageable });
  }

  /*getPrestamos(title?: String, gameId?: number): Observable<Prestamo[]> {            
      return this.http.get<Prestamo[]>(this.composeFindUrl(title, gameId));
  } */

  savePrestamo(prestamo: Prestamo): Observable<void> {
    let url = 'http://localhost:8080/prestamo';

    if (prestamo.id != null) {
      url += '/' + prestamo.id;
    }

    return this.http.put<void>(url, prestamo);
  }

  deletePrestamo(idPrestamo: number): Observable<any> {
    return this.http.delete('http://localhost:8080/prestamo/' + idPrestamo);
  }

  getGames(title?: String, categoryId?: number): Observable<Game[]> {            
    return this.http.get<Game[]>(this.composeFindUrl(title, categoryId));
}


  getClients(title?: String, clientId?: number): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.composeFindUrl(title, clientId));
  }

  private composeFindUrl(title?: String, categoryId?: number) : string {
    let params = '';

    if (title != null) {
        params += 'title='+title;
    }

    if (categoryId != null) {
        if (params != '') params += "&";
        params += "idCategory="+categoryId;
    }

    let url = 'http://localhost:8080/game'

    if (params == '') return url;
    else return url + '?'+params;
}
}
