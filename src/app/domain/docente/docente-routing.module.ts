import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteListComponent } from './docente-list/docente-list.component';
import { DocenteFormComponent } from "./docente-form/docente-form.component";
import { DocenteDetailsComponent } from "./docente-details/docente-details.component";

const DocenteRoutes: Routes = [
    { path: '', component: DocenteListComponent },
    { path: 'visualizar/:id', component: DocenteDetailsComponent },
    { path: 'novo', component: DocenteFormComponent },
    { path: 'alterar/:id', component: DocenteFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(DocenteRoutes)],
    exports: [RouterModule]
})

export class DocenteRouting { }
