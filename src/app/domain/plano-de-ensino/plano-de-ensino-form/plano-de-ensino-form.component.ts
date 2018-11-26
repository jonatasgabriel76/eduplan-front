import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PlanoDeEnsino } from '../plano-de-ensino';
import { PlanoDeEnsinoService } from '../plano-de-ensino.service';
import { DocenteService } from 'app/domain/docente/docente.service';
import { Docente } from 'app/domain/docente/docente';

@Component({
  selector: 'app-plano-de-ensino-form',
  templateUrl: './plano-de-ensino-form.component.html',
  styleUrls: ['./plano-de-ensino-form.component.css']
})
export class PlanoDeEnsinoFormComponent implements OnInit {

  planoDeEnsino: PlanoDeEnsino;
  planoDeEnsinoForm: FormGroup;
  docentes: Docente[];

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private imagem: FormBuilder,
    public planoDeEnsinoService: PlanoDeEnsinoService,
    public docenteService: DocenteService

  ) { }

  ngOnInit() {

    this.planoDeEnsino = new PlanoDeEnsino();

    this.docenteService.findAll().subscribe(docentes =>{
      this.docentes = docentes;
    })

    /* Obter o `ID` passado por parâmetro na URL */
    this.planoDeEnsino.id = this.route.snapshot.params['id'];

    /* Reactive Forms */
    this.planoDeEnsinoForm = this.builder.group({
      id:[],
      disciplina: [null, [Validators.required, Validators.maxLength(10)]],
      docente: [],
      chteorica: [null, [Validators.required, Validators.maxLength(50)]],
      chpratica: [null, [Validators.required, Validators.maxLength(50)]],
      chtotal: [null, [Validators.required, Validators.maxLength(50)]],
      creditos: [null, [Validators.required, Validators.maxLength(50)]],
      periodo: [null, [Validators.required, Validators.maxLength(50)]],
      turno: [null, [Validators.required, Validators.maxLength(20)]],
      ano: [null, [Validators.required, Validators.maxLength(50)]],
      semestre: [null, [Validators.required, Validators.maxLength(50)]]
    }, {});

    // Se existir `ID` realiza busca para trazer os dados
    if (this.planoDeEnsino.id != null) {
      this.planoDeEnsinoService.findOne(this.planoDeEnsino.id)
        .subscribe(planoDeEnsino => {
          this.planoDeEnsinoForm.patchValue(planoDeEnsino);
        });
    }
  }
  
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  /* Método para salva plano de ensino */
  salvar(planoDeEnsino: PlanoDeEnsino) {
    this.planoDeEnsinoService.save(planoDeEnsino)
      .subscribe(response => {
        /* Redireciona para lista */
        this.router.navigate(['/plano-de-ensino']);
      })
  }

}
