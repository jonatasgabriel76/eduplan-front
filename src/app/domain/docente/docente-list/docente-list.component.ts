import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

//MODAL
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DATATABLE_OPTIONS } from '../../../app.api';

import { DocenteService } from "../docente.service";
import { Docente } from "../docente";

@Component({
  selector: 'app-docente-list',
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css']
})
export class DocenteListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Docente> = new Subject();

  modalRef: BsModalRef;

  selectedDocente: Docente;
  selectedIndex: number;
  docentes: Docente[];

  constructor(
    private modalService: BsModalService,
    public docenteService: DocenteService
  ) { }

  ngOnInit() {

    this.dtOptions = DATATABLE_OPTIONS;

    this.docenteService.findAll()
      .subscribe(docentes => {
        this.docentes = docentes;
        this.dtTrigger.next();
      });

  }

  openModal(template: TemplateRef<any>, docente: Docente, index: number) {
    this.selectedDocente = docente;
    this.selectedIndex = index;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deleteInstituicao(): void {

    this.docenteService.delete(this.selectedDocente.id)
      .subscribe(response => {
        this.docentes.splice(this.selectedIndex, 1);
        this.modalRef.hide();

      });
  }

  hideModal(): void {
    this.modalRef.hide();
  }

}
