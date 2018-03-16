package ar.gob.iighi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A ResidenciaPersonaje.
 */
@Entity
@Table(name = "residencia_personaje")
@Document(indexName = "residenciapersonaje")
public class ResidenciaPersonaje implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha_desde")
    private LocalDate fechaDesde;

    @Column(name = "fecha_hasta")
    private LocalDate fechaHasta;

    @ManyToOne(optional = false)
    @NotNull
    private Lugar lugar;

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

    public ResidenciaPersonaje fechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
        return this;
    }

    public void setFechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    public LocalDate getFechaHasta() {
        return fechaHasta;
    }

    public ResidenciaPersonaje fechaHasta(LocalDate fechaHasta) {
        this.fechaHasta = fechaHasta;
        return this;
    }

    public void setFechaHasta(LocalDate fechaHasta) {
        this.fechaHasta = fechaHasta;
    }

    public Lugar getLugar() {
        return lugar;
    }

    public ResidenciaPersonaje lugar(Lugar lugar) {
        this.lugar = lugar;
        return this;
    }

    public void setLugar(Lugar lugar) {
        this.lugar = lugar;
    }

    public Personaje getPersonaje() {
        return personaje;
    }

    public ResidenciaPersonaje personaje(Personaje personaje) {
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
        ResidenciaPersonaje residenciaPersonaje = (ResidenciaPersonaje) o;
        if (residenciaPersonaje.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), residenciaPersonaje.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResidenciaPersonaje{" +
            "id=" + getId() +
            ", fechaDesde='" + getFechaDesde() + "'" +
            ", fechaHasta='" + getFechaHasta() + "'" +
            "}";
    }
}
