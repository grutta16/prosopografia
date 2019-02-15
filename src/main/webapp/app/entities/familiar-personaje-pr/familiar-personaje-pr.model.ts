import { BaseEntity } from './../../shared';

export class FamiliarPersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public nombres?: string,
        public apellidos?: string,
        public relacionFamiliar?: BaseEntity,
        public personaje?: BaseEntity,
    ) {
    }
}
