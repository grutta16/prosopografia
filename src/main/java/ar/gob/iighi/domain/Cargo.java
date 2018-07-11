package ar.gob.iighi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import ar.gob.iighi.domain.enumeration.Ambito;

/**
 * A Cargo.
 */
@Entity
@Table(name = "cargo")
@Document(indexName = "cargo")
public class Cargo implements Serializable {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "ambito", nullable = false)
    private Ambito ambito;

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

    public Cargo nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Ambito getAmbito() {
        return ambito;
    }

    public Cargo ambito(Ambito ambito) {
        this.ambito = ambito;
        return this;
    }

    public void setAmbito(Ambito ambito) {
        this.ambito = ambito;
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
        Cargo cargo = (Cargo) o;
        if (cargo.getNombre().equalsIgnoreCase(this.getNombre()) && cargo.getAmbito().equals(this.getAmbito())) {
            return true;
        }
        if (cargo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cargo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cargo{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", ambito='" + getAmbito() + "'" +
            "}";
    }
}
