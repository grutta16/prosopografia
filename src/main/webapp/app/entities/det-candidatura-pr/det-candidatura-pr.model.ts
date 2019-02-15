import { BaseEntity } from './../../shared';

export class DetCandidaturaPr implements BaseEntity {
    constructor(
        public id?: number,
        public fechaInicio?: any,
        public fechaFin?: any,
        public observaciones?: string,
        public candidatura?: BaseEntity,
    ) {
    }
}
