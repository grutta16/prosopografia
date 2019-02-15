package ar.gob.iighi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import ar.gob.iighi.domain.enumeration.Nivel;

/**
 * A Institucion.
 */
@Entity
@Table(name = "institucion")
@Document(indexName = "institucion")
public class Institucion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel")
    private Nivel nivel;

    @ManyToOne(optional = false)
    @NotNull
    private Lugar lugar;

    @ManyToMany
    @JoinTable(name = "institucion_carreras",
               joinColumns = @JoinColumn(name="institucions_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="carreras_id", referencedColumnName="id"))
    private Set<Carrera> carreras = new HashSet<>();

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

    public Institucion nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Nivel getNivel() {
        return nivel;
    }

    public Institucion nivel(Nivel nivel) {
        this.nivel = nivel;
        return this;
    }

    public void setNivel(Nivel nivel) {
        this.nivel = nivel;
    }

    public Lugar getLugar() {
        return lugar;
    }

    public Institucion lugar(Lugar lugar) {
        this.lugar = lugar;
        return this;
    }

    public void setLugar(Lugar lugar) {
        this.lugar = lugar;
    }

    public Set<Carrera> getCarreras() {
        return carreras;
    }

    public Institucion carreras(Set<Carrera> carreras) {
        this.carreras = carreras;
        return this;
    }

    public Institucion addCarreras(Carrera carrera) {
        this.carreras.add(carrera);
        return this;
    }

    public Institucion removeCarreras(Carrera carrera) {
        this.carreras.remove(carrera);
        return this;
    }

    public void setCarreras(Set<Carrera> carreras) {
        this.carreras = carreras;
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
        Institucion institucion = (Institucion) o;
        if (institucion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), institucion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Institucion{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", nivel='" + getNivel() + "'" +
            "}";
    }
}
