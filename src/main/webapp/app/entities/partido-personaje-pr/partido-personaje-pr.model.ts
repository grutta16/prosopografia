import { BaseEntity } from './../../shared';

export class PartidoPersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public fechaDesde?: any,
        public fechaHasta?: any,
        public partido?: BaseEntity,
        public personaje?: BaseEntity,
    ) {
    }
}
