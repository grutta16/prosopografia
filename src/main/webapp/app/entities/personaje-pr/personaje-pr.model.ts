import { BaseEntity } from './../../shared';

export class PersonajePr implements BaseEntity {
    constructor(
        public id?: number,
        public nombres?: string,
        public apellidos?: string,
        public fechaNacimiento?: any,
        public fechaDefuncion?: any,
        public nombresAlternativos?: string,
        public apellidosAlternativos?: string,
        public sexo?: boolean,
        public observaciones?: string,
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
        public candidaturas?: BaseEntity[],
    ) {
        this.sexo = false;
    }
}
