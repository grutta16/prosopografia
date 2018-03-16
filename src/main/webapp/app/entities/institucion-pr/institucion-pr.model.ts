import { BaseEntity } from './../../shared';

export const enum Nivel {
    'PRIMARIO',
    'SECUNDARIO',
    'TERCIARIO',
    'UNIVERSITARIO'
}

export class InstitucionPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public nivel?: Nivel,
        public lugar?: BaseEntity,
        public carreras?: BaseEntity[],
    ) {
    }
}
