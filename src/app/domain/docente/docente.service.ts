import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HttpInterceptor } from '../../httpInterceptor';

import { URI_SERVER_API } from '../../app.api';

import { Docente } from "./docente";

@Injectable()
export class DocenteService {

  constructor(
    public http: HttpInterceptor
  ) { }

  findAll(): Observable<Docente[]> {
    return this.http
      .get(`${URI_SERVER_API}/docente`)
      .map(response => response.json().content);
  }

  findOne(id: number): Observable<Docente> {
    return this.http
      .get(`${URI_SERVER_API}/docente/${id}`)
      .map(response => response.json().content);
  }

  save(docente: Docente): Observable<Docente> {

    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })

    if (docente.id) {
      return this.http
        .put(`${URI_SERVER_API}/docente`, JSON.stringify(docente), options)
        .map(response => response.json().content);
    }
    else {
      return this.http
        .post(`${URI_SERVER_API}/docente`, JSON.stringify(docente), options)
        .map(response => response.json().content);
    }
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete(`${URI_SERVER_API}/docente/${id}`)
      .map(response => response.json().content);
  }

}
