import { BaseEntity } from './../../shared';

export class SeccionPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
    ) {
    }
}
