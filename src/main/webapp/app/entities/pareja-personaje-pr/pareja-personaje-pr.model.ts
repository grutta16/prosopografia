import { BaseEntity } from './../../shared';

export class ParejaPersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public fechaDesde?: any,
        public fechaHasta?: any,
        public persona?: BaseEntity,
        public personaje?: BaseEntity,
    ) {
    }
}
