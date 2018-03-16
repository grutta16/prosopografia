import { BaseEntity } from './../../shared';

export class AsociacionPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
    ) {
    }
}
