import { Injectable } from '@angular/core';
import { Client } from './model/Client';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CLIENT_DATA } from './model/mock-clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8080/client');
}

  saveClient(client: Client): Observable<Client> {
    let url = 'http://localhost:8080/client';

    //check if name is already in the ddbb
    var nameUser = client.name;

    if (nameUser != client.name) {
      var nameNotRepeated = true;
    }

    if (client.id != null && !nameNotRepeated) {
      url += '/'+client.id
    };

    return this.http.put<Client>(url, client);
  }

  deleteClient(idClient : number): Observable<any> {
    return this.http.delete('http://localhost:8080/client/'+idClient);
  }  

}
