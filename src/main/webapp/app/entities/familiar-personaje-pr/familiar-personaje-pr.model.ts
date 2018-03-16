import { BaseEntity } from './../../shared';

export class FamiliarPersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public persona?: BaseEntity,
        public relacionFamiliar?: BaseEntity,
        public personaje?: BaseEntity,
    ) {
    }
}
