import { BaseEntity } from './../../shared';

export class ParejaPersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public nombres?: string,
        public apellidos?: string,
        public fechaDesde?: any,
        public fechaHasta?: any,
        public personaje?: BaseEntity,
    ) {
    }
}
