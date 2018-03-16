import { BaseEntity } from './../../shared';

export class PersonaPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombres?: string,
        public apellidos?: string,
    ) {
    }
}
