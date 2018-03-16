import { BaseEntity } from './../../shared';

export class ReligionPersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public fechaDesde?: any,
        public fechaHasta?: any,
        public religion?: BaseEntity,
        public personaje?: BaseEntity,
    ) {
    }
}
