import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdemServicoService } from '../../services/ordem-servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusOrdemServico } from '../../models/status-ordens-servico';
import { OrdemServicoRequest } from '../../models/ordens-servico-request';

@Component({
  selector: 'app-ordem-servico-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ordem-servico-form.component.html',
  styleUrl: './ordem-servico-form.component.scss'
})
export class OrdemServicoFormComponent implements OnInit{
private fb = inject(FormBuilder);
  private service = inject(OrdemServicoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // ENUM para select
  statusList = Object.values(StatusOrdemServico);

  // Labels amigáveis (opcional mas recomendado)
  statusLabel: Record<StatusOrdemServico, string> = {
    ABERTA: 'Aberta',
    ANDAMENTO: 'Em andamento',
    FINALIZADA: 'Finalizada',
    CANCELADA: 'Cancelada'
  };

  form = this.fb.group({
    id: [null as number | null],
    clienteId: [null as number | null, Validators.required],
    equipamentoId: [null as number | null, Validators.required],
    descricao: ['', Validators.required],
    dataAbertura: ['', Validators.required],
    dataFechamento: [''],
    dataProximaManutencao: [''],
    status: [StatusOrdemServico.ABERTA, Validators.required]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.service.findById(id).subscribe(res => {
        this.form.patchValue({
          id: res.id,
          clienteId: res.clienteId,
          equipamentoId: res.equipamentoId,
          descricao: res.descricao,
          dataAbertura: this.formatDateTime(res.dataAbertura),
          dataFechamento: this.formatDateTime(res.dataFechamento),
          dataProximaManutencao: this.formatDate(res.dataProximaManutencao),
          status: res.status
        });
      });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const payload: OrdemServicoRequest = {
      clienteId: formValue.clienteId!,
      equipamentoId: formValue.equipamentoId!,
      descricao: formValue.descricao!,
      dataAbertura: this.toISODateTime(formValue.dataAbertura!),
      dataFechamento: formValue.dataFechamento
        ? this.toISODateTime(formValue.dataFechamento)
        : undefined,
      dataProximaManutencao: formValue.dataProximaManutencao || undefined,
      status: formValue.status!
    };

    if (formValue.id) {
      this.service.update(formValue.id, payload).subscribe(() => {
        this.router.navigate(['/ordens-servico']);
      });
    } else {
      this.service.save(payload).subscribe(() => {
        this.router.navigate(['/ordens-servico']);
      });
    }
  }

  // ===== Helpers de data (ESSENCIAL) =====

  private formatDateTime(value?: string | null): string {
    if (!value) return '';
    return value.substring(0, 16); // yyyy-MM-ddTHH:mm
  }

  private formatDate(value?: string | null): string {
    if (!value) return '';
    return value.substring(0, 10); // yyyy-MM-dd
  }

  private toISODateTime(value: string): string {
    return value.length === 16 ? value + ':00' : value;
  }
}