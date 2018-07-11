package ar.gob.iighi.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A FamiliarPersonaje.
 */
@Entity
@Table(name = "familiar_personaje")
@Document(indexName = "familiarpersonaje")
public class FamiliarPersonaje implements Serializable {

    private static final long serialVersionUID = 1L;

//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
//    @SequenceGenerator(name = "sequenceGenerator")
//    private Long id;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "nombres", length = 100, nullable = false)
    private String nombres;

    @NotNull
    @Size(max = 100)
    @Column(name = "apellidos", length = 100, nullable = false)
    private String apellidos;

    @ManyToOne(optional = false)
    @NotNull
    private RelacionFamiliar relacionFamiliar;

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

    public String getNombres() {
        return nombres;
    }

    public FamiliarPersonaje nombres(String nombres) {
        this.nombres = nombres;
        return this;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public FamiliarPersonaje apellidos(String apellidos) {
        this.apellidos = apellidos;
        return this;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public RelacionFamiliar getRelacionFamiliar() {
        return relacionFamiliar;
    }

    public FamiliarPersonaje relacionFamiliar(RelacionFamiliar relacionFamiliar) {
        this.relacionFamiliar = relacionFamiliar;
        return this;
    }

    public void setRelacionFamiliar(RelacionFamiliar relacionFamiliar) {
        this.relacionFamiliar = relacionFamiliar;
    }

    public Personaje getPersonaje() {
        return personaje;
    }

    public FamiliarPersonaje personaje(Personaje personaje) {
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
        FamiliarPersonaje familiarPersonaje = (FamiliarPersonaje) o;
        if (familiarPersonaje.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), familiarPersonaje.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FamiliarPersonaje{" +
            "id=" + getId() +
            ", nombres='" + getNombres() + "'" +
            ", apellidos='" + getApellidos() + "'" +
            "}";
    }
}
