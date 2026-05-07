import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';
import { EquipamentoListComponent } from './features/equipamento/pages/equipamento-list/equipamento-list.component';
import { EquipamentoFormComponent } from './features/equipamento/pages/equipamento-form/equipamento-form.component';

export const routes: Routes = [

  // 🔓 Rota pública
  { path: 'login', component: LoginComponent },

  // 🔐 Área protegida
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      // Dashboard
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/home/home.component')
            .then(m => m.HomeComponent)
      },

      // CLIENTES
      {
        path: 'clientes',
        loadComponent: () =>
          import('./features/cliente/pages/cliente-list/cliente-list.component')
            .then(m => m.ClienteListComponent)
      },
      {
        path: 'clientes/novo',
        loadComponent: () =>
          import('./features/cliente/pages/cliente-form/cliente-form.component')
            .then(m => m.ClienteFormComponent)
      },
      {
        path: 'clientes/editar/:id',
        loadComponent: () =>
          import('./features/cliente/pages/cliente-form/cliente-form.component')
            .then(m => m.ClienteFormComponent)
      },

      // EQUIPAMENTOS (PADRONIZADO)
      {
        path: 'equipamentos',
        loadComponent: () =>
          import('./features/equipamento/pages/equipamento-list/equipamento-list.component')
            .then(m => m.EquipamentoListComponent)
      },
      {
        path: 'equipamentos/novo',
        loadComponent: () =>
          import('./features/equipamento/pages/equipamento-form/equipamento-form.component')
            .then(m => m.EquipamentoFormComponent)
      },
      {
        path: 'equipamentos/editar/:id',
        loadComponent: () =>
          import('./features/equipamento/pages/equipamento-form/equipamento-form.component')
            .then(m => m.EquipamentoFormComponent)
      },

      // ORDEM DE SERVIÇO
      {
        path: 'ordens-servico',
        loadComponent: () =>
          import('./features/ordem-servico/pages/ordem-servico-list/ordem-servico-list.component')
            .then(m => m.OrdemServicoListComponent)
      },
      {
        path: 'ordens-servico/novo',
        loadComponent: () =>
          import('./features/ordem-servico/pages/ordem-servico-form/ordem-servico-form.component')
            .then(m => m.OrdemServicoFormComponent)
      },
      {
        path: 'ordens-servico/editar/:id',
        loadComponent: () =>
          import('./features/ordem-servico/pages/ordem-servico-form/ordem-servico-form.component')
            .then(m => m.OrdemServicoFormComponent)
      }

    ]
  },

  { path: '**', redirectTo: '' }
];
