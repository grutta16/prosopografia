import { BaseEntity } from './../../shared';

export class TipoProfesionPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
    ) {
    }
}
