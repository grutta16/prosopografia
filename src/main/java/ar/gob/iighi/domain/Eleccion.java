package ar.gob.iighi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import ar.gob.iighi.domain.enumeration.Alcance;

/**
 * A Eleccion.
 */
@Entity
@Table(name = "eleccion")
@Document(indexName = "eleccion")
public class Eleccion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "fuente")
    private String fuente;

    @Size(max = 2000)
    @Column(name = "observaciones", length = 2000)
    private String observaciones;

    @Enumerated(EnumType.STRING)
    @Column(name = "alcance")
    private Alcance alcance;

    @ManyToOne(optional = false)
    @NotNull
    private Cargo cargo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Eleccion nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public Eleccion fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getFuente() {
        return fuente;
    }

    public Eleccion fuente(String fuente) {
        this.fuente = fuente;
        return this;
    }

    public void setFuente(String fuente) {
        this.fuente = fuente;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Eleccion observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Alcance getAlcance() {
        return alcance;
    }

    public Eleccion alcance(Alcance alcance) {
        this.alcance = alcance;
        return this;
    }

    public void setAlcance(Alcance alcance) {
        this.alcance = alcance;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public Eleccion cargo(Cargo cargo) {
        this.cargo = cargo;
        return this;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
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
        Eleccion eleccion = (Eleccion) o;
        if (eleccion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eleccion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Eleccion{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", fuente='" + getFuente() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            ", alcance='" + getAlcance() + "'" +
            "}";
    }
}
