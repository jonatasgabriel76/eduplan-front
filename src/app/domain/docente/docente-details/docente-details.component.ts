import { DocenteService } from './../docente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Docente } from "../docente";

@Component({
  selector: 'app-docente-details',
  templateUrl: './docente-details.component.html',
  styleUrls: ['./docente-details.component.css']
})
export class DocenteDetailsComponent implements OnInit {

  docente: Docente;
  docenteForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    public docenteService: DocenteService,
  ) { }

  ngOnInit() {

    this.docente = new Docente();

    /* Obter o `ID` passado por parâmetro na URL */
    this.docente.id = this.route.snapshot.params['id'];

    /* Reactive Forms */
    this.docenteForm = this.builder.group({
      id: [],
      nome: this.builder.control('', [Validators.required, Validators.maxLength(80)]),
      email: this.builder.control('', [Validators.required, Validators.maxLength(3)]),
      senha: this.builder.control('', [Validators.required, Validators.maxLength(20)]),
      matricula: this.builder.control('', [Validators.required, Validators.maxLength(50)]),
      perfil: this.builder.control('', [Validators.required, Validators.maxLength(50)])
    }, {});
    

    // Desabilitar formulário para edição
    this.docenteForm.disable();

    // Se existir `ID` realiza busca para trazer os dados
    if (this.docente.id != null) {
      this.docenteService.findOne(this.docente.id)
        .subscribe(docente => {
          this.docenteForm = this.builder.group(docente, {})
        })
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
