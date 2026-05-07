import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Clima Control</span>
      <span style="flex: 1 1 auto;"></span>
      <button mat-button (click)="clientes()">Clientes</button>
      <button mat-button (click)="equipamentos()">Equipamentos</button>
      <button mat-button (click)="ordemServico()">OS</button>
      <button mat-button (click)="logout()">Logout</button>

    </mat-toolbar>
  `
})
export class NavbarComponent {

  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

  clientes() {
    this.authService.clientes();
  }

  equipamentos() {
  this.authService.equipamentos();
  }

  ordemServico() {
  this.authService.ordemServico();
  }
}