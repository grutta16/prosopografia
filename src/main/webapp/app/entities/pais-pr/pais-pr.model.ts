import { BaseEntity } from './../../shared';

export class PaisPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public provincias?: BaseEntity[],
    ) {
    }
}
