import { PlanoDeEnsinoService } from './plano-de-ensino.service';
import { PlanoDeEnsinoRouting } from './plano-de-ensino-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from "../../shared/shared.module";

// Components
import { PlanoDeEnsinoListComponent } from './plano-de-ensino-list/plano-de-ensino-list.component';
import { PlanoDeEnsinoFormComponent } from './plano-de-ensino-form/plano-de-ensino-form.component';
import { PlanoDeEnsinoDetailsComponent } from './plano-de-ensino-details/plano-de-ensino-details.component';
import { DocenteService } from '../docente/docente.service';

@NgModule({
  declarations: [
    PlanoDeEnsinoDetailsComponent,
    PlanoDeEnsinoFormComponent,
    PlanoDeEnsinoListComponent
  ],
  imports: [
    // angular
    HttpModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // plugins
    DataTablesModule,

    // shared
    SharedModule,

    // Component
    PlanoDeEnsinoRouting
  ],
  providers: [
    // services
    PlanoDeEnsinoService,
    DocenteService
  ]
})
export class PlanoDeEnsinoModule { }
