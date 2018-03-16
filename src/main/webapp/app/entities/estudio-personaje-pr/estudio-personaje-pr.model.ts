import { BaseEntity } from './../../shared';

export class EstudioPersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public anioInicio?: number,
        public anioFin?: number,
        public institucion?: BaseEntity,
        public carrera?: BaseEntity,
        public personaje?: BaseEntity,
    ) {
    }
}
