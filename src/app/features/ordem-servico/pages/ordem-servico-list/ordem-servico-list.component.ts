import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdemServicoService } from '../../services/ordem-servico.service';
import { OrdemServicoResponse } from '../../models/ordens-servico-response';
import { StatusOrdemServico } from '../../models/status-ordens-servico';

@Component({
  selector: 'app-ordem-servico-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ordem-servico-list.component.html',
  styleUrl: './ordem-servico-list.component.scss'
})
export class OrdemServicoListComponent implements OnInit{

 private service = inject(OrdemServicoService);

  ordens: OrdemServicoResponse[] = [];

  // Labels amigáveis
  statusLabel: Record<StatusOrdemServico, string> = {
    ABERTA: 'Aberta',
    ANDAMENTO: 'Em andamento',
    FINALIZADA: 'Finalizada',
    CANCELADA: 'Cancelada'
  };

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.findAll().subscribe({
      next: (res) => {
        this.ordens = res;
      },
      error: (err) => {
        console.error('Erro ao carregar ordens de serviço', err);
      }
    });
  }

  delete(id: number) {
    if (!confirm('Deseja realmente excluir esta ordem de serviço?')) return;

    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error('Erro ao excluir ordem de serviço', err);
      }
    });
  }

  // ===== Helpers =====

  formatDateTime(value?: string): string {
    if (!value) return '-';
    return new Date(value).toLocaleString();
  }

  formatDate(value?: string): string {
    if (!value) return '-';
    return new Date(value).toLocaleDateString();
  }
}