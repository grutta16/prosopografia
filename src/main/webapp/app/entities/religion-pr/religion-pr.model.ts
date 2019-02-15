import { BaseEntity } from './../../shared';

export class ReligionPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
    ) {
    }
}
