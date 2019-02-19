package ar.gob.iighi.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Pais.
 */
@Entity
@Table(name = "pais")
@Document(indexName = "pais")
public class Pais implements Serializable {

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

//    @OneToMany(mappedBy = "pais")
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "pais")
    @JsonIgnore
    private Set<Provincia> provincias = new HashSet<>();

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

    public Pais nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Provincia> getProvincias() {
        return provincias;
    }

    public Pais provincias(Set<Provincia> provincias) {
        this.provincias = provincias;
        return this;
    }

    public Pais addProvincias(Provincia provincia) {
        this.provincias.add(provincia);
        provincia.setPais(this);
        return this;
    }

    public Pais removeProvincias(Provincia provincia) {
        this.provincias.remove(provincia);
        provincia.setPais(null);
        return this;
    }

    public void setProvincias(Set<Provincia> provincias) {
        this.provincias = provincias;
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
        Pais pais = (Pais) o;
        if (pais.getNombre().equalsIgnoreCase(this.getNombre())) {
            return true;
        }
        if (pais.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pais.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pais{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
