package ar.gob.iighi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A AsociacionPersonaje.
 */
@Entity
@Table(name = "asociacion_personaje")
@Document(indexName = "asociacionpersonaje")
public class AsociacionPersonaje implements Serializable {

    private static final long serialVersionUID = 1L;

//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
//    @SequenceGenerator(name = "sequenceGenerator")
//    private Long id;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_desde")
    private LocalDate fechaDesde;

    @Column(name = "fecha_hasta")
    private LocalDate fechaHasta;

    @ManyToOne(optional = false)
    @NotNull
    private Asociacion asociacion;

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

    public LocalDate getFechaDesde() {
        return fechaDesde;
    }

    public AsociacionPersonaje fechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
        return this;
    }

    public void setFechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    public LocalDate getFechaHasta() {
        return fechaHasta;
    }

    public AsociacionPersonaje fechaHasta(LocalDate fechaHasta) {
        this.fechaHasta = fechaHasta;
        return this;
    }

    public void setFechaHasta(LocalDate fechaHasta) {
        this.fechaHasta = fechaHasta;
    }

    public Asociacion getAsociacion() {
        return asociacion;
    }

    public AsociacionPersonaje asociacion(Asociacion asociacion) {
        this.asociacion = asociacion;
        return this;
    }

    public void setAsociacion(Asociacion asociacion) {
        this.asociacion = asociacion;
    }

    public Personaje getPersonaje() {
        return personaje;
    }

    public AsociacionPersonaje personaje(Personaje personaje) {
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
        AsociacionPersonaje asociacionPersonaje = (AsociacionPersonaje) o;
        if (asociacionPersonaje.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), asociacionPersonaje.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AsociacionPersonaje{" +
            "id=" + getId() +
            ", fechaDesde='" + getFechaDesde() + "'" +
            ", fechaHasta='" + getFechaHasta() + "'" +
            "}";
    }
}
