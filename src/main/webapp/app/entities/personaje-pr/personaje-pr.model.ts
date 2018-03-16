import { BaseEntity } from './../../shared';

export class PersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public fechaNacimiento?: any,
        public fechaDefuncion?: any,
        public nombresAlternativos?: string,
        public apellidosAlternativos?: string,
        public sexo?: boolean,
        public observaciones?: string,
        public persona?: BaseEntity,
        public lugarNacimiento?: BaseEntity,
        public lugarDefuncion?: BaseEntity,
        public profesiones?: BaseEntity[],
        public parejas?: BaseEntity[],
        public familiares?: BaseEntity[],
        public estudios?: BaseEntity[],
        public asociaciones?: BaseEntity[],
        public partidos?: BaseEntity[],
        public religiones?: BaseEntity[],
        public residencias?: BaseEntity[],
        public cargos?: BaseEntity[],
    ) {
        this.sexo = false;
    }
}
