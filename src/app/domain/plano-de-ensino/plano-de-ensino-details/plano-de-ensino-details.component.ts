import { Docente } from 'app/domain/docente/docente';
import { DocenteService } from './../../docente/docente.service';
import { PlanoDeEnsino } from './../plano-de-ensino';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanoDeEnsinoService } from '../plano-de-ensino.service';

@Component({
  selector: 'app-plano-de-ensino-details',
  templateUrl: './plano-de-ensino-details.component.html',
  styleUrls: ['./plano-de-ensino-details.component.css']
})
export class PlanoDeEnsinoDetailsComponent implements OnInit {

  planoDeEnsino: PlanoDeEnsino;
  planoDeEnsinoForm: FormGroup;
  docentes: Docente[];

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    public planoDeEnsinoService: PlanoDeEnsinoService,
    public docenteService: DocenteService
  ) { }

  ngOnInit() {

    this.docenteService.findAll().subscribe(docentes =>{
      this.docentes = docentes;
    })
    
    this.planoDeEnsino = new PlanoDeEnsino();
    
    /* Obter o `ID` passado por parâmetro na URL */
    this.planoDeEnsino.id = this.route.snapshot.params['id'];

    /* Reactive Forms */
    this.planoDeEnsinoForm = this.builder.group({
      id: [],
      disciplina: this.builder.control('', [Validators.required, Validators.maxLength(100)]),
      docente: this.builder.control(''),
      chteorica: this.builder.control('', [Validators.required, Validators.maxLength(20)]),
      chpratica: this.builder.control('', [Validators.required, Validators.maxLength(50)]),
      chtotal: this.builder.control('', [Validators.required, Validators.maxLength(50)]),
      creditos: this.builder.control('', [Validators.required, Validators.maxLength(50)]),
      periodo: this.builder.control('', [Validators.required, Validators.maxLength(50)]),
      turno: this.builder.control('', [Validators.required, Validators.maxLength(50)]),
      ano: this.builder.control('', [Validators.required, Validators.maxLength(50)]),
      semestre: this.builder.control('', [Validators.required, Validators.maxLength(50)]),
    }, {});

    // Desabilitar formulário para edição
    this.planoDeEnsinoForm.disable();

    // Se existir `ID` realiza busca para trazer os dados
    if (this.planoDeEnsino.id != null) {
      this.planoDeEnsinoService.findOne(this.planoDeEnsino.id)
        .subscribe(planoDeEnsino => {
          this.planoDeEnsinoForm = this.builder.group(planoDeEnsino, {})
        })
    }
  }
}
