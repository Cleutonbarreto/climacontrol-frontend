import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Cliente } from '../../models/cliente.models';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];

  filtro: string = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarClientes();
  }

  /* =========================
     BUSCAR CLIENTES
  ========================== */
  buscarClientes(): void {
    this.clienteService.listar().subscribe({
      next: (data) => {
        this.clientes = data;
        this.aplicarFiltro();
      },
      error: (err) => {
        console.error('Erro ao buscar clientes', err);
      }
    });
  }

  /* =========================
     FILTRO
  ========================== */
  aplicarFiltro(): void {
    const termo = this.filtro?.toLowerCase() || '';

    this.clientesFiltrados = this.clientes.filter(c =>
      c.nome?.toLowerCase().includes(termo) ||
      c.documento?.toLowerCase().includes(termo) ||
      c.cidade?.toLowerCase().includes(termo)
    );
  }

  /* =========================
     EDITAR
  ========================== */
  editar(id: number): void {
    this.router.navigate([`/clientes/editar/${id}`]);
  }

  /* =========================
     DELETAR
  ========================== */
  deletar(id: number): void {

    const confirmar = confirm('Deseja realmente excluir este cliente?');

    if (!confirmar) return;

    this.clienteService.deletar(id).subscribe({
      next: () => {
        this.clientes = this.clientes.filter(c => c.id !== id);
        this.aplicarFiltro();
      },
      error: (err) => {
        console.error('Erro ao deletar cliente', err);
      }
    });
  }
}