import { BaseEntity } from './../../shared';

export class LugarPr implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public provincia?: BaseEntity,
    ) {
    }
}
