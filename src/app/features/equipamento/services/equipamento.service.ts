import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipamentoResponse } from '../models/equipamento-response.model.js';
import { EquipamentoRequest } from '../models/equipamento-request.model.js';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  private http = inject(HttpClient);
  private API = 'http://localhost:8080/equipamentos';

  findAll(): Observable<EquipamentoResponse[]> {
    return this.http.get<EquipamentoResponse[]>(this.API);
  }

  findById(id: number): Observable<EquipamentoResponse> {
    return this.http.get<EquipamentoResponse>(`${this.API}/${id}`);
  }

  save(data: EquipamentoRequest): Observable<EquipamentoResponse> {
    return this.http.post<EquipamentoResponse>(this.API, data);
  }

  update(id: number, data: EquipamentoRequest): Observable<EquipamentoResponse> {
    return this.http.put<EquipamentoResponse>(`${this.API}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}