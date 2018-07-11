package ar.gob.iighi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Profesion.
 */
@Entity
@Table(name = "profesion")
@Document(indexName = "profesion")
public class Profesion implements Serializable {

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
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @ManyToOne(optional = false)
    @NotNull
    private TipoProfesion tipoProfesion;

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

    public Profesion nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoProfesion getTipoProfesion() {
        return tipoProfesion;
    }

    public Profesion tipoProfesion(TipoProfesion tipoProfesion) {
        this.tipoProfesion = tipoProfesion;
        return this;
    }

    public void setTipoProfesion(TipoProfesion tipoProfesion) {
        this.tipoProfesion = tipoProfesion;
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
        Profesion profesion = (Profesion) o;
        if (profesion.getNombre().equalsIgnoreCase(this.getNombre())) {
            return true;
        }
        if (profesion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), profesion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Profesion{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
