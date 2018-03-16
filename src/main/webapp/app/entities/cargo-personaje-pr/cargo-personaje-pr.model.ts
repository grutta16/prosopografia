import { BaseEntity } from './../../shared';

export const enum Alcance {
    'INTERNO',
    'DE_GOBIERNO'
}

export class CargoPersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public fechaInicio?: any,
        public fechaFin?: any,
        public observaciones?: string,
        public alcance?: Alcance,
        public cargo?: BaseEntity,
        public personaje?: BaseEntity,
    ) {
    }
}
