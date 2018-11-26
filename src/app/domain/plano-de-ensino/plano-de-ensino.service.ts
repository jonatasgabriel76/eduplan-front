import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HttpInterceptor } from '../../httpInterceptor';

import { URI_SERVER_API } from '../../app.api';

import { PlanoDeEnsino } from "./plano-de-ensino";

@Injectable()
export class PlanoDeEnsinoService {

  constructor(
    public http: HttpInterceptor
  ) { }

  findAll(): Observable<PlanoDeEnsino[]> {
    return this.http
      .get(`${URI_SERVER_API}/plano-de-ensino`)
      .map(response => response.json().content);
  }

  findOne(id: number): Observable<PlanoDeEnsino> {
    return this.http
      .get(`${URI_SERVER_API}/plano-de-ensino/${id}`)
      .map(response => response.json().content);
  }

  save(planoDeEnsino: PlanoDeEnsino): Observable<PlanoDeEnsino> {

    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })

    if (planoDeEnsino.id) {
      return this.http
        .put(`${URI_SERVER_API}/plano-de-ensino`, JSON.stringify(planoDeEnsino), options)
        .map(response => response.json().content);
    }
    else {
      return this.http
        .post(`${URI_SERVER_API}/plano-de-ensino`, JSON.stringify(planoDeEnsino), options)
        .map(response => response.json().content);
    }
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete(`${URI_SERVER_API}/plano-de-ensino/${id}`)
      .map(response => response.json().content);
  }

}
