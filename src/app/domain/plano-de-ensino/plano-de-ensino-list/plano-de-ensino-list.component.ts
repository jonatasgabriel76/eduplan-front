import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

//MODAL
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DATATABLE_OPTIONS } from '../../../app.api';

import { PlanoDeEnsinoService } from "../plano-de-ensino.service";
import { PlanoDeEnsino } from "../plano-de-ensino";

@Component({
  selector: 'app-plano-de-ensino-list',
  templateUrl: './plano-de-ensino-list.component.html',
  styleUrls: ['./plano-de-ensino-list.component.css']
})
export class PlanoDeEnsinoListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<PlanoDeEnsino> = new Subject();

  modalRef: BsModalRef;

  selectedPlanoDeEnsino: PlanoDeEnsino;
  selectedIndex: number;
  planosDeEnsino: PlanoDeEnsino[];

  constructor(
    private modalService: BsModalService,
    public planoDeEnsinoService: PlanoDeEnsinoService
  ) { }

  ngOnInit() {

    // this.layout.title = 'Lista de PlanosDeEnsino';
    this.dtOptions = DATATABLE_OPTIONS;

    this.planoDeEnsinoService.findAll()
      .subscribe(planosDeEnsino => {
        this.planosDeEnsino = planosDeEnsino;
        this.dtTrigger.next();
      });

  }

  openModal(template: TemplateRef<any>, planoDeEnsino: PlanoDeEnsino, index: number) {
    this.selectedPlanoDeEnsino = planoDeEnsino;
    this.selectedIndex = index;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deletePlanosDeEnsino(): void {

    this.planoDeEnsinoService.delete(this.selectedPlanoDeEnsino.id)
      .subscribe(response => {
        this.planosDeEnsino.splice(this.selectedIndex, 1);
        this.modalRef.hide();

      });
  }

  hideModal(): void {
    this.modalRef.hide();
  }

}
