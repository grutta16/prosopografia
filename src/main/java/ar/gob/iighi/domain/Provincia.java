package ar.gob.iighi.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Provincia.
 */
@Entity
@Table(name = "provincia")
@Document(indexName = "provincia")
public class Provincia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "provincia")
    @JsonIgnore
    private Set<Lugar> lugares = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private Pais pais;

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

    public Provincia nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Lugar> getLugares() {
        return lugares;
    }

    public Provincia lugares(Set<Lugar> lugars) {
        this.lugares = lugars;
        return this;
    }

    public Provincia addLugares(Lugar lugar) {
        this.lugares.add(lugar);
        lugar.setProvincia(this);
        return this;
    }

    public Provincia removeLugares(Lugar lugar) {
        this.lugares.remove(lugar);
        lugar.setProvincia(null);
        return this;
    }

    public void setLugares(Set<Lugar> lugars) {
        this.lugares = lugars;
    }

    public Pais getPais() {
        return pais;
    }

    public Provincia pais(Pais pais) {
        this.pais = pais;
        return this;
    }

    public void setPais(Pais pais) {
        this.pais = pais;
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
        Provincia provincia = (Provincia) o;
        if (provincia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), provincia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Provincia{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
