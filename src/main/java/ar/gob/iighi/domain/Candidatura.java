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
 * A Candidatura.
 */
@Entity
@Table(name = "candidatura")
@Document(indexName = "candidatura")
public class Candidatura implements Serializable {

    private static final long serialVersionUID = 1L;

//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
//    @SequenceGenerator(name = "sequenceGenerator")
//    private Long id;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "es_suplente")
    private Boolean esSuplente;

    @Column(name = "resulto_electo")
    private Boolean resultoElecto;

    @Size(max = 2000)
    @Column(name = "observaciones", length = 2000)
    private String observaciones;

    @Size(max = 4)
    @Column(name = "anio", length = 4)
    private String anio;

    @OneToMany(mappedBy = "candidatura")
    @JsonIgnore
    private Set<DetCandidatura> detCandidaturas = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private Eleccion eleccion;

    @ManyToOne(optional = false)
    @NotNull
    private Seccion seccion;

    @ManyToOne(optional = false)
    @NotNull
    private Personaje personaje;

    @ManyToOne(optional = false)
    @NotNull
    private Partido partido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isEsSuplente() {
        return esSuplente;
    }

    public Candidatura esSuplente(Boolean esSuplente) {
        this.esSuplente = esSuplente;
        return this;
    }

    public void setEsSuplente(Boolean esSuplente) {
        this.esSuplente = esSuplente;
    }

    public Boolean isResultoElecto() {
        return resultoElecto;
    }

    public Candidatura resultoElecto(Boolean resultoElecto) {
        this.resultoElecto = resultoElecto;
        return this;
    }

    public void setResultoElecto(Boolean resultoElecto) {
        this.resultoElecto = resultoElecto;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Candidatura observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getAnio() {
        return anio;
    }

    public Candidatura anio(String anio) {
        this.anio = anio;
        return this;
    }

    public void setAnio(String anio) {
        this.anio = anio;
    }

    public Set<DetCandidatura> getDetCandidaturas() {
        return detCandidaturas;
    }

    public Candidatura detCandidaturas(Set<DetCandidatura> detCandidaturas) {
        this.detCandidaturas = detCandidaturas;
        return this;
    }

    public Candidatura addDetCandidaturas(DetCandidatura detCandidatura) {
        this.detCandidaturas.add(detCandidatura);
        detCandidatura.setCandidatura(this);
        return this;
    }

    public Candidatura removeDetCandidaturas(DetCandidatura detCandidatura) {
        this.detCandidaturas.remove(detCandidatura);
        detCandidatura.setCandidatura(null);
        return this;
    }

    public void setDetCandidaturas(Set<DetCandidatura> detCandidaturas) {
        this.detCandidaturas = detCandidaturas;
    }

    public Eleccion getEleccion() {
        return eleccion;
    }

    public Candidatura eleccion(Eleccion eleccion) {
        this.eleccion = eleccion;
        return this;
    }

    public void setEleccion(Eleccion eleccion) {
        this.eleccion = eleccion;
    }

    public Seccion getSeccion() {
        return seccion;
    }

    public Candidatura seccion(Seccion seccion) {
        this.seccion = seccion;
        return this;
    }

    public void setSeccion(Seccion seccion) {
        this.seccion = seccion;
    }

    public Personaje getPersonaje() {
        return personaje;
    }

    public Candidatura personaje(Personaje personaje) {
        this.personaje = personaje;
        return this;
    }

    public void setPersonaje(Personaje personaje) {
        this.personaje = personaje;
    }

    public Partido getPartido() {
        return partido;
    }

    public Candidatura partido(Partido partido) {
        this.partido = partido;
        return this;
    }

    public void setPartido(Partido partido) {
        this.partido = partido;
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
        Candidatura candidatura = (Candidatura) o;
        if (candidatura.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), candidatura.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Candidatura{" +
            "id=" + getId() +
            ", esSuplente='" + isEsSuplente() + "'" +
            ", resultoElecto='" + isResultoElecto() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            ", anio='" + getAnio() + "'" +
            "}";
    }
}
