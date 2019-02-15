package ar.gob.iighi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A EstudioPersonaje.
 */
@Entity
@Table(name = "estudio_personaje")
@Document(indexName = "estudiopersonaje")
public class EstudioPersonaje implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "anio_inicio")
    private Integer anioInicio;

    @Column(name = "anio_fin")
    private Integer anioFin;

    @ManyToOne(optional = false)
    @NotNull
    private Institucion institucion;

    @ManyToOne(optional = false)
    @NotNull
    private Carrera carrera;

    @ManyToOne(optional = false)
    @NotNull
    private Personaje personaje;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnioInicio() {
        return anioInicio;
    }

    public EstudioPersonaje anioInicio(Integer anioInicio) {
        this.anioInicio = anioInicio;
        return this;
    }

    public void setAnioInicio(Integer anioInicio) {
        this.anioInicio = anioInicio;
    }

    public Integer getAnioFin() {
        return anioFin;
    }

    public EstudioPersonaje anioFin(Integer anioFin) {
        this.anioFin = anioFin;
        return this;
    }

    public void setAnioFin(Integer anioFin) {
        this.anioFin = anioFin;
    }

    public Institucion getInstitucion() {
        return institucion;
    }

    public EstudioPersonaje institucion(Institucion institucion) {
        this.institucion = institucion;
        return this;
    }

    public void setInstitucion(Institucion institucion) {
        this.institucion = institucion;
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public EstudioPersonaje carrera(Carrera carrera) {
        this.carrera = carrera;
        return this;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public Personaje getPersonaje() {
        return personaje;
    }

    public EstudioPersonaje personaje(Personaje personaje) {
        this.personaje = personaje;
        return this;
    }

    public void setPersonaje(Personaje personaje) {
        this.personaje = personaje;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EstudioPersonaje estudioPersonaje = (EstudioPersonaje) o;
        if (estudioPersonaje.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), estudioPersonaje.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EstudioPersonaje{" +
            "id=" + getId() +
            ", anioInicio=" + getAnioInicio() +
            ", anioFin=" + getAnioFin() +
            "}";
    }
}
