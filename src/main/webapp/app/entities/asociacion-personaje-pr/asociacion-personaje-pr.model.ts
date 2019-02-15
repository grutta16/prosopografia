import { BaseEntity } from './../../shared';

export class AsociacionPersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public fechaDesde?: any,
        public fechaHasta?: any,
        public asociacion?: BaseEntity,
        public personaje?: BaseEntity,
    ) {
    }
}
