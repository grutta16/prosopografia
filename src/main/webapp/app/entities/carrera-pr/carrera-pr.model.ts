import { BaseEntity } from './../../shared';

export class CarreraPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public titulo?: string,
        public duracion?: number,
    ) {
    }
}
