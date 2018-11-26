import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: 'app/domain/dashboard/dashboard.module#DashboardModule' },
  { path: 'docente', loadChildren: 'app/domain/docente/docente.module#DocenteModule' },
  { path: 'plano-de-ensino', loadChildren: 'app/domain/plano-de-ensino/plano-de-ensino.module#PlanoDeEnsinoModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
