import { BaseEntity } from './../../shared';

export class ProfesionPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public tipoProfesion?: BaseEntity,
    ) {
    }
}
