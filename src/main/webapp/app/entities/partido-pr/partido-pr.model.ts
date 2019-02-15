import { BaseEntity } from './../../shared';

export class PartidoPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public abreviacion?: string,
    ) {
    }
}
