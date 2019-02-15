import { BaseEntity } from './../../shared';

export class CandidaturaPr implements BaseEntity {
    constructor(
        public id?: number,
        public esSuplente?: boolean,
        public resultoElecto?: boolean,
        public observaciones?: string,
        public anio?: string,
        public detCandidaturas?: BaseEntity[],
        public eleccion?: BaseEntity,
        public seccion?: BaseEntity,
        public personaje?: BaseEntity,
        public partido?: BaseEntity,
    ) {
        this.esSuplente = false;
        this.resultoElecto = false;
    }
}
