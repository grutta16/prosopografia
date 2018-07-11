package ar.gob.iighi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Carrera.
 */
@Entity
@Table(name = "carrera")
@Document(indexName = "carrera")
public class Carrera implements Serializable {

    private static final long serialVersionUID = 1L;

//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
//    @SequenceGenerator(name = "sequenceGenerator")
//    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "nombre", length = 50, nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Size(max = 50)
    @Column(name = "titulo", length = 50, nullable = false, unique = true)
    private String titulo;

    @NotNull
    @Column(name = "duracion", nullable = false)
    private Float duracion;

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

    public Carrera nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTitulo() {
        return titulo;
    }

    public Carrera titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Float getDuracion() {
        return duracion;
    }

    public Carrera duracion(Float duracion) {
        this.duracion = duracion;
        return this;
    }

    public void setDuracion(Float duracion) {
        this.duracion = duracion;
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
        Carrera carrera = (Carrera) o;
        if (carrera.getNombre().equalsIgnoreCase(this.getNombre()) || carrera.getTitulo().equalsIgnoreCase(this.getTitulo())) {
            return true;
        }
        if (carrera.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carrera.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Carrera{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", duracion=" + getDuracion() +
            "}";
    }
}
