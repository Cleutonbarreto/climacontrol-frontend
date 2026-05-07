import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente.models';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent {

  cliente: Cliente = {} as Cliente;

  constructor(
    private service: ClienteService,
    private router: Router
  ) { }

salvar() {
  this.service.salvar(this.cliente).subscribe({
    next: () => {
      alert('Cliente salvo com sucesso');
      this.router.navigate(['/clientes']);
    },
    error: (err) => {
      if (err.status === 409) {
        alert('Já existe um cliente com esse documento.');
      } else if (err.status === 403) {
        alert('Sessão expirada ou sem permissão.');
      } else {
        alert('Erro ao salvar cliente.');
      }

      console.error(err);
    }
  });
}
}
