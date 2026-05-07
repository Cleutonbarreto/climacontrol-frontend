import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EquipamentoService } from '../../services/equipamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentoRequest } from '../../models/equipamento-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipamento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.scss']
})
export class EquipamentoFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private service = inject(EquipamentoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group({
    id: [null as number | null],
    tipo: ['', Validators.required],
    capacidade: [null as number | null],
    modelo: [''],
    marca: [''],
    clienteId: [null as number | null, Validators.required]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.service.findById(id).subscribe(res => {

        this.form.patchValue({
          id: res.id,
          tipo: res.tipo,
          capacidade: res.capacidade,
          modelo: res.modelo,
          marca: res.marca,
          clienteId: res.clienteId
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

    const payload: EquipamentoRequest = {
      tipo: formValue.tipo!,
      capacidade: formValue.capacidade ?? undefined,
      modelo: formValue.modelo ?? '',
      marca: formValue.marca ?? '',
      clienteId: formValue.clienteId!
    };

    if (formValue.id) {
      this.service.update(formValue.id, payload).subscribe(() => {
        this.router.navigate(['/equipamentos']);
      });
    } else {
      this.service.save(payload).subscribe(() => {
        this.router.navigate(['/equipamentos']);
      });
    }
  }
}