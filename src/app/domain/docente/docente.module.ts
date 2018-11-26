import { DocenteService } from './docente.service';
import { DocenteRouting } from './docente-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from "../../shared/shared.module";

// Component
import { DocenteListComponent } from './docente-list/docente-list.component';
import { DocenteFormComponent } from './docente-form/docente-form.component';
import { DocenteDetailsComponent } from './docente-details/docente-details.component';

@NgModule({
  declarations: [
    DocenteDetailsComponent,
    DocenteFormComponent,
    DocenteListComponent
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
    DocenteRouting
  ],
  providers: [
    // services
    DocenteService,
  ]
})
export class DocenteModule { }
