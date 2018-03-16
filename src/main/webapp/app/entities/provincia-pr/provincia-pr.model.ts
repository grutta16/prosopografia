import { BaseEntity } from './../../shared';

export class ProvinciaPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public lugares?: BaseEntity[],
        public pais?: BaseEntity,
    ) {
    }
}
