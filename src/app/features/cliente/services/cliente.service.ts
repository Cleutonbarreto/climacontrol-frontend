import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

   private API = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  /* =========================
     LISTAR
  ========================== */
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  /* =========================
     BUSCAR POR ID
  ========================== */
  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/${id}`);
  }

  /* =========================
     SALVAR (CREATE)
  ========================== */
  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  /* =========================
     ATUALIZAR (UPDATE)
  ========================== */
  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API}/${id}`, cliente);
  }

  /* =========================
     DELETAR (DELETE)
  ========================== */
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}