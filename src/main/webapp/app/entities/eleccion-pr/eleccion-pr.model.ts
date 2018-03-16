import { BaseEntity } from './../../shared';

export const enum Alcance {
    'INTERNO',
    'DE_GOBIERNO'
}

export class EleccionPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public fecha?: any,
        public fuente?: string,
        public observaciones?: string,
        public alcance?: Alcance,
        public cargo?: BaseEntity,
    ) {
    }
}
