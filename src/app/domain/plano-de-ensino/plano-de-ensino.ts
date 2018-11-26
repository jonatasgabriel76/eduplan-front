import { Docente } from './../docente/docente';
export class PlanoDeEnsino {
    id: number;
    disciplina: string;
    docente: Docente;
    chteorica: string;
    chpratica: string;
    chtotal: string;
    creditos: string;
    periodo: string;
    turno: string;
    ano: string;
    semestre: string;
}
