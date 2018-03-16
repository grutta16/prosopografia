import { BaseEntity } from './../../shared';

export const enum Ambito {
    'MUNICIPAL',
    'PROVINCIAL',
    'NACIONAL',
    'INTERNACIONAL'
}

export class CargoPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public ambito?: Ambito,
    ) {
    }
}
