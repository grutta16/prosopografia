package ar.gob.iighi.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;


import io.github.jhipster.service.filter.LocalDateFilter;



/**
 * Criteria class for the Personaje entity. This class is used in PersonajeResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /personajes?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PersonajeCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private LocalDateFilter fechaNacimiento;

    private LocalDateFilter fechaDefuncion;

    private StringFilter nombresAlternativos;

    private StringFilter apellidosAlternativos;

    private BooleanFilter sexo;

    private StringFilter observaciones;

    private LongFilter personaId;

    private LongFilter lugarNacimientoId;

    private LongFilter lugarDefuncionId;

    private LongFilter profesionesId;

    private LongFilter parejasId;

    private LongFilter familiaresId;

    private LongFilter estudiosId;

    private LongFilter asociacionesId;

    private LongFilter partidosId;

    private LongFilter religionesId;

    private LongFilter residenciasId;

    private LongFilter cargosId;

    public PersonajeCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LocalDateFilter getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDateFilter fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public LocalDateFilter getFechaDefuncion() {
        return fechaDefuncion;
    }

    public void setFechaDefuncion(LocalDateFilter fechaDefuncion) {
        this.fechaDefuncion = fechaDefuncion;
    }

    public StringFilter getNombresAlternativos() {
        return nombresAlternativos;
    }

    public void setNombresAlternativos(StringFilter nombresAlternativos) {
        this.nombresAlternativos = nombresAlternativos;
    }

    public StringFilter getApellidosAlternativos() {
        return apellidosAlternativos;
    }

    public void setApellidosAlternativos(StringFilter apellidosAlternativos) {
        this.apellidosAlternativos = apellidosAlternativos;
    }

    public BooleanFilter getSexo() {
        return sexo;
    }

    public void setSexo(BooleanFilter sexo) {
        this.sexo = sexo;
    }

    public StringFilter getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(StringFilter observaciones) {
        this.observaciones = observaciones;
    }

    public LongFilter getPersonaId() {
        return personaId;
    }

    public void setPersonaId(LongFilter personaId) {
        this.personaId = personaId;
    }

    public LongFilter getLugarNacimientoId() {
        return lugarNacimientoId;
    }

    public void setLugarNacimientoId(LongFilter lugarNacimientoId) {
        this.lugarNacimientoId = lugarNacimientoId;
    }

    public LongFilter getLugarDefuncionId() {
        return lugarDefuncionId;
    }

    public void setLugarDefuncionId(LongFilter lugarDefuncionId) {
        this.lugarDefuncionId = lugarDefuncionId;
    }

    public LongFilter getProfesionesId() {
        return profesionesId;
    }

    public void setProfesionesId(LongFilter profesionesId) {
        this.profesionesId = profesionesId;
    }

    public LongFilter getParejasId() {
        return parejasId;
    }

    public void setParejasId(LongFilter parejasId) {
        this.parejasId = parejasId;
    }

    public LongFilter getFamiliaresId() {
        return familiaresId;
    }

    public void setFamiliaresId(LongFilter familiaresId) {
        this.familiaresId = familiaresId;
    }

    public LongFilter getEstudiosId() {
        return estudiosId;
    }

    public void setEstudiosId(LongFilter estudiosId) {
        this.estudiosId = estudiosId;
    }

    public LongFilter getAsociacionesId() {
        return asociacionesId;
    }

    public void setAsociacionesId(LongFilter asociacionesId) {
        this.asociacionesId = asociacionesId;
    }

    public LongFilter getPartidosId() {
        return partidosId;
    }

    public void setPartidosId(LongFilter partidosId) {
        this.partidosId = partidosId;
    }

    public LongFilter getReligionesId() {
        return religionesId;
    }

    public void setReligionesId(LongFilter religionesId) {
        this.religionesId = religionesId;
    }

    public LongFilter getResidenciasId() {
        return residenciasId;
    }

    public void setResidenciasId(LongFilter residenciasId) {
        this.residenciasId = residenciasId;
    }

    public LongFilter getCargosId() {
        return cargosId;
    }

    public void setCargosId(LongFilter cargosId) {
        this.cargosId = cargosId;
    }

    @Override
    public String toString() {
        return "PersonajeCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (fechaNacimiento != null ? "fechaNacimiento=" + fechaNacimiento + ", " : "") +
                (fechaDefuncion != null ? "fechaDefuncion=" + fechaDefuncion + ", " : "") +
                (nombresAlternativos != null ? "nombresAlternativos=" + nombresAlternativos + ", " : "") +
                (apellidosAlternativos != null ? "apellidosAlternativos=" + apellidosAlternativos + ", " : "") +
                (sexo != null ? "sexo=" + sexo + ", " : "") +
                (observaciones != null ? "observaciones=" + observaciones + ", " : "") +
                (personaId != null ? "personaId=" + personaId + ", " : "") +
                (lugarNacimientoId != null ? "lugarNacimientoId=" + lugarNacimientoId + ", " : "") +
                (lugarDefuncionId != null ? "lugarDefuncionId=" + lugarDefuncionId + ", " : "") +
                (profesionesId != null ? "profesionesId=" + profesionesId + ", " : "") +
                (parejasId != null ? "parejasId=" + parejasId + ", " : "") +
                (familiaresId != null ? "familiaresId=" + familiaresId + ", " : "") +
                (estudiosId != null ? "estudiosId=" + estudiosId + ", " : "") +
                (asociacionesId != null ? "asociacionesId=" + asociacionesId + ", " : "") +
                (partidosId != null ? "partidosId=" + partidosId + ", " : "") +
                (religionesId != null ? "religionesId=" + religionesId + ", " : "") +
                (residenciasId != null ? "residenciasId=" + residenciasId + ", " : "") +
                (cargosId != null ? "cargosId=" + cargosId + ", " : "") +
            "}";
    }

}
