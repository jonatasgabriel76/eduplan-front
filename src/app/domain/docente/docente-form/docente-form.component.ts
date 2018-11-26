import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DocenteService } from "../docente.service";
import { Docente } from "../docente";

@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.css']
})
export class DocenteFormComponent implements OnInit {

  docente: Docente;
  docenteForm: FormGroup;

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    public docenteService: DocenteService,
  ) { }

  ngOnInit() {
    this.docente = new Docente();

    /* Obter o `ID` passado por parâmetro na URL */
    this.docente.id = this.route.snapshot.params['id'];

    /* Reactive Forms */
    this.docenteForm = this.builder.group({
      id:[],
      nome: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.maxLength(150)]],
      senha: [null, [Validators.required, Validators.maxLength(50)]],
      matricula: [null, [Validators.required, Validators.maxLength(50)]],
      perfil: [null, [Validators.required, Validators.maxLength(50)]]      
    }, {});

    // Se existir `ID` realiza busca para trazer os dados
    if (this.docente.id != null) {
      this.docenteService.findOne(this.docente.id)
        .subscribe(docente => {
          this.docenteForm.patchValue(docente);
        });
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  /* Método para salva docente */
  salvar(docente: Docente) {
    this.docenteService.save(docente)
      .subscribe(response => {
        /* Redireciona para lista */
        this.router.navigate(['/docente']);
      })
  }

}