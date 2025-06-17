import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InicioComponent } from './pages/dashboard/inicio/inicio.component';
import { UsuariosComponent } from './pages/dashboard/usuarios/usuarios.component';
import { BetsListComponent } from './pages/dashboard/apuestas/components/bets-list/bets-list.component';
import { BetHistoryComponent } from './pages/dashboard/historial/historial.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: InicioComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'apuestas', component: BetsListComponent },
      { path: 'historial', component: BetHistoryComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {};
