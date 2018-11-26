import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanoDeEnsinoFormComponent } from './plano-de-ensino-form/plano-de-ensino-form.component';
import { PlanoDeEnsinoDetailsComponent } from './plano-de-ensino-details/plano-de-ensino-details.component';
import { PlanoDeEnsinoListComponent } from './plano-de-ensino-list/plano-de-ensino-list.component';

const PlanoDeEnsinoRoutes: Routes = [
    { path: '', component: PlanoDeEnsinoListComponent },
    { path: 'visualizar/:id', component: PlanoDeEnsinoDetailsComponent },
    { path: 'novo', component: PlanoDeEnsinoFormComponent },
    { path: 'alterar/:id', component: PlanoDeEnsinoFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(PlanoDeEnsinoRoutes)],
    exports: [RouterModule]
})

export class PlanoDeEnsinoRouting { }
