import { BaseEntity } from './../../shared';

export class ResidenciaPersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public fechaDesde?: any,
        public fechaHasta?: any,
        public lugar?: BaseEntity,
        public personaje?: BaseEntity,
    ) {
    }
}
