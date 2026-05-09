import { inject, Injectable } from '@angular/core';
import { OrdemServicoResponse } from '../models/ordens-servico-response';
import { Observable } from 'rxjs';
import { OrdemServicoRequest } from '../models/ordens-servico-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {
 private http = inject(HttpClient);
  private API = `${environment.apiUrl}/ordens-servico`;

  findAll(): Observable<OrdemServicoResponse[]> {
    return this.http.get<OrdemServicoResponse[]>(this.API);
  }

  findById(id: number): Observable<OrdemServicoResponse> {
    return this.http.get<OrdemServicoResponse>(`${this.API}/${id}`);
  }

  save(data: OrdemServicoRequest): Observable<OrdemServicoResponse> {
    return this.http.post<OrdemServicoResponse>(this.API, data);
  }

  update(id: number, data: OrdemServicoRequest): Observable<OrdemServicoResponse> {
    return this.http.put<OrdemServicoResponse>(`${this.API}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}