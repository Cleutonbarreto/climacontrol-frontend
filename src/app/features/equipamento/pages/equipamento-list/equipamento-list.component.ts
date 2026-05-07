import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipamentoService } from '../../services/equipamento.service';
import { EquipamentoResponse } from '../../models/equipamento-response.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-equipamento-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './equipamento-list.component.html',
  styleUrls: ['./equipamento-list.component.scss']
})
export class EquipamentoListComponent implements OnInit {

  private service = inject(EquipamentoService);

  equipamentos: EquipamentoResponse[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.findAll().subscribe({
      next: (res) => {
        this.equipamentos = res;
      },
      error: (err) => {
        console.error('Erro ao carregar equipamentos', err);
      }
    });
  }

  delete(id: number) {
    if (!confirm('Deseja realmente excluir este equipamento?')) return;

    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error('Erro ao excluir equipamento', err);
      }
    });
  }
}