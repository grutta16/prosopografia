package ar.gob.iighi.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Personaje.
 */
@Entity
@Table(name = "personaje")
@Document(indexName = "personaje")
public class Personaje implements Serializable {

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

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "fecha_defuncion")
    private LocalDate fechaDefuncion;

    @Size(max = 100)
    @Column(name = "nombres_alternativos", length = 100)
    private String nombresAlternativos;

    @Size(max = 100)
    @Column(name = "apellidos_alternativos", length = 100)
    private String apellidosAlternativos;

    @Column(name = "sexo")
    private Boolean sexo;

    @Size(max = 2000)
    @Column(name = "observaciones", length = 2000)
    private String observaciones;

    @ManyToOne
    private Lugar lugarNacimiento;

    @ManyToOne
    private Lugar lugarDefuncion;

    @ManyToMany
    @JoinTable(name = "personaje_profesiones",
               joinColumns = @JoinColumn(name="personajes_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="profesiones_id", referencedColumnName="id"))
    private Set<Profesion> profesiones = new HashSet<>();

    @OneToMany(mappedBy = "personaje")
    @JsonIgnore
    private Set<ParejaPersonaje> parejas = new HashSet<>();

    @OneToMany(mappedBy = "personaje")
    @JsonIgnore
    private Set<FamiliarPersonaje> familiares = new HashSet<>();

    @OneToMany(mappedBy = "personaje")
    @JsonIgnore
    private Set<EstudioPersonaje> estudios = new HashSet<>();

    @OneToMany(mappedBy = "personaje")
    @JsonIgnore
    private Set<AsociacionPersonaje> asociaciones = new HashSet<>();

    @OneToMany(mappedBy = "personaje")
    @JsonIgnore
    private Set<PartidoPersonaje> partidos = new HashSet<>();

    @OneToMany(mappedBy = "personaje")
    @JsonIgnore
    private Set<ReligionPersonaje> religiones = new HashSet<>();

    @OneToMany(mappedBy = "personaje")
    @JsonIgnore
    private Set<ResidenciaPersonaje> residencias = new HashSet<>();

    @OneToMany(mappedBy = "personaje")
    @JsonIgnore
    private Set<CargoPersonaje> cargos = new HashSet<>();

    @OneToMany(mappedBy = "personaje")
    @JsonIgnore
    private Set<Candidatura> candidaturas = new HashSet<>();

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

    public Personaje nombres(String nombres) {
        this.nombres = nombres;
        return this;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public Personaje apellidos(String apellidos) {
        this.apellidos = apellidos;
        return this;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public Personaje fechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public LocalDate getFechaDefuncion() {
        return fechaDefuncion;
    }

    public Personaje fechaDefuncion(LocalDate fechaDefuncion) {
        this.fechaDefuncion = fechaDefuncion;
        return this;
    }

    public void setFechaDefuncion(LocalDate fechaDefuncion) {
        this.fechaDefuncion = fechaDefuncion;
    }

    public String getNombresAlternativos() {
        return nombresAlternativos;
    }

    public Personaje nombresAlternativos(String nombresAlternativos) {
        this.nombresAlternativos = nombresAlternativos;
        return this;
    }

    public void setNombresAlternativos(String nombresAlternativos) {
        this.nombresAlternativos = nombresAlternativos;
    }

    public String getApellidosAlternativos() {
        return apellidosAlternativos;
    }

    public Personaje apellidosAlternativos(String apellidosAlternativos) {
        this.apellidosAlternativos = apellidosAlternativos;
        return this;
    }

    public void setApellidosAlternativos(String apellidosAlternativos) {
        this.apellidosAlternativos = apellidosAlternativos;
    }

    public Boolean isSexo() {
        return sexo;
    }

    public Personaje sexo(Boolean sexo) {
        this.sexo = sexo;
        return this;
    }

    public void setSexo(Boolean sexo) {
        this.sexo = sexo;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Personaje observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Lugar getLugarNacimiento() {
        return lugarNacimiento;
    }

    public Personaje lugarNacimiento(Lugar lugar) {
        this.lugarNacimiento = lugar;
        return this;
    }

    public void setLugarNacimiento(Lugar lugar) {
        this.lugarNacimiento = lugar;
    }

    public Lugar getLugarDefuncion() {
        return lugarDefuncion;
    }

    public Personaje lugarDefuncion(Lugar lugar) {
        this.lugarDefuncion = lugar;
        return this;
    }

    public void setLugarDefuncion(Lugar lugar) {
        this.lugarDefuncion = lugar;
    }

    public Set<Profesion> getProfesiones() {
        return profesiones;
    }

    public Personaje profesiones(Set<Profesion> profesions) {
        this.profesiones = profesions;
        return this;
    }

    public Personaje addProfesiones(Profesion profesion) {
        this.profesiones.add(profesion);
        return this;
    }

    public Personaje removeProfesiones(Profesion profesion) {
        this.profesiones.remove(profesion);
        return this;
    }

    public void setProfesiones(Set<Profesion> profesions) {
        this.profesiones = profesions;
    }

    public Set<ParejaPersonaje> getParejas() {
        return parejas;
    }

    public Personaje parejas(Set<ParejaPersonaje> parejaPersonajes) {
        this.parejas = parejaPersonajes;
        return this;
    }

    public Personaje addParejas(ParejaPersonaje parejaPersonaje) {
        this.parejas.add(parejaPersonaje);
        parejaPersonaje.setPersonaje(this);
        return this;
    }

    public Personaje removeParejas(ParejaPersonaje parejaPersonaje) {
        this.parejas.remove(parejaPersonaje);
        parejaPersonaje.setPersonaje(null);
        return this;
    }

    public void setParejas(Set<ParejaPersonaje> parejaPersonajes) {
        this.parejas = parejaPersonajes;
    }

    public Set<FamiliarPersonaje> getFamiliares() {
        return familiares;
    }

    public Personaje familiares(Set<FamiliarPersonaje> familiarPersonajes) {
        this.familiares = familiarPersonajes;
        return this;
    }

    public Personaje addFamiliares(FamiliarPersonaje familiarPersonaje) {
        this.familiares.add(familiarPersonaje);
        familiarPersonaje.setPersonaje(this);
        return this;
    }

    public Personaje removeFamiliares(FamiliarPersonaje familiarPersonaje) {
        this.familiares.remove(familiarPersonaje);
        familiarPersonaje.setPersonaje(null);
        return this;
    }

    public void setFamiliares(Set<FamiliarPersonaje> familiarPersonajes) {
        this.familiares = familiarPersonajes;
    }

    public Set<EstudioPersonaje> getEstudios() {
        return estudios;
    }

    public Personaje estudios(Set<EstudioPersonaje> estudioPersonajes) {
        this.estudios = estudioPersonajes;
        return this;
    }

    public Personaje addEstudios(EstudioPersonaje estudioPersonaje) {
        this.estudios.add(estudioPersonaje);
        estudioPersonaje.setPersonaje(this);
        return this;
    }

    public Personaje removeEstudios(EstudioPersonaje estudioPersonaje) {
        this.estudios.remove(estudioPersonaje);
        estudioPersonaje.setPersonaje(null);
        return this;
    }

    public void setEstudios(Set<EstudioPersonaje> estudioPersonajes) {
        this.estudios = estudioPersonajes;
    }

    public Set<AsociacionPersonaje> getAsociaciones() {
        return asociaciones;
    }

    public Personaje asociaciones(Set<AsociacionPersonaje> asociacionPersonajes) {
        this.asociaciones = asociacionPersonajes;
        return this;
    }

    public Personaje addAsociaciones(AsociacionPersonaje asociacionPersonaje) {
        this.asociaciones.add(asociacionPersonaje);
        asociacionPersonaje.setPersonaje(this);
        return this;
    }

    public Personaje removeAsociaciones(AsociacionPersonaje asociacionPersonaje) {
        this.asociaciones.remove(asociacionPersonaje);
        asociacionPersonaje.setPersonaje(null);
        return this;
    }

    public void setAsociaciones(Set<AsociacionPersonaje> asociacionPersonajes) {
        this.asociaciones = asociacionPersonajes;
    }

    public Set<PartidoPersonaje> getPartidos() {
        return partidos;
    }

    public Personaje partidos(Set<PartidoPersonaje> partidoPersonajes) {
        this.partidos = partidoPersonajes;
        return this;
    }

    public Personaje addPartidos(PartidoPersonaje partidoPersonaje) {
        this.partidos.add(partidoPersonaje);
        partidoPersonaje.setPersonaje(this);
        return this;
    }

    public Personaje removePartidos(PartidoPersonaje partidoPersonaje) {
        this.partidos.remove(partidoPersonaje);
        partidoPersonaje.setPersonaje(null);
        return this;
    }

    public void setPartidos(Set<PartidoPersonaje> partidoPersonajes) {
        this.partidos = partidoPersonajes;
    }

    public Set<ReligionPersonaje> getReligiones() {
        return religiones;
    }

    public Personaje religiones(Set<ReligionPersonaje> religionPersonajes) {
        this.religiones = religionPersonajes;
        return this;
    }

    public Personaje addReligiones(ReligionPersonaje religionPersonaje) {
        this.religiones.add(religionPersonaje);
        religionPersonaje.setPersonaje(this);
        return this;
    }

    public Personaje removeReligiones(ReligionPersonaje religionPersonaje) {
        this.religiones.remove(religionPersonaje);
        religionPersonaje.setPersonaje(null);
        return this;
    }

    public void setReligiones(Set<ReligionPersonaje> religionPersonajes) {
        this.religiones = religionPersonajes;
    }

    public Set<ResidenciaPersonaje> getResidencias() {
        return residencias;
    }

    public Personaje residencias(Set<ResidenciaPersonaje> residenciaPersonajes) {
        this.residencias = residenciaPersonajes;
        return this;
    }

    public Personaje addResidencias(ResidenciaPersonaje residenciaPersonaje) {
        this.residencias.add(residenciaPersonaje);
        residenciaPersonaje.setPersonaje(this);
        return this;
    }

    public Personaje removeResidencias(ResidenciaPersonaje residenciaPersonaje) {
        this.residencias.remove(residenciaPersonaje);
        residenciaPersonaje.setPersonaje(null);
        return this;
    }

    public void setResidencias(Set<ResidenciaPersonaje> residenciaPersonajes) {
        this.residencias = residenciaPersonajes;
    }

    public Set<CargoPersonaje> getCargos() {
        return cargos;
    }

    public Personaje cargos(Set<CargoPersonaje> cargoPersonajes) {
        this.cargos = cargoPersonajes;
        return this;
    }

    public Personaje addCargos(CargoPersonaje cargoPersonaje) {
        this.cargos.add(cargoPersonaje);
        cargoPersonaje.setPersonaje(this);
        return this;
    }

    public Personaje removeCargos(CargoPersonaje cargoPersonaje) {
        this.cargos.remove(cargoPersonaje);
        cargoPersonaje.setPersonaje(null);
        return this;
    }

    public void setCargos(Set<CargoPersonaje> cargoPersonajes) {
        this.cargos = cargoPersonajes;
    }

    public Set<Candidatura> getCandidaturas() {
        return candidaturas;
    }

    public Personaje candidaturas(Set<Candidatura> candidaturas) {
        this.candidaturas = candidaturas;
        return this;
    }

    public Personaje addCandidaturas(Candidatura candidatura) {
        this.candidaturas.add(candidatura);
        candidatura.setPersonaje(this);
        return this;
    }

    public Personaje removeCandidaturas(Candidatura candidatura) {
        this.candidaturas.remove(candidatura);
        candidatura.setPersonaje(null);
        return this;
    }

    public void setCandidaturas(Set<Candidatura> candidaturas) {
        this.candidaturas = candidaturas;
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
        Personaje personaje = (Personaje) o;
        if (personaje.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personaje.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Personaje{" +
            "id=" + getId() +
            ", nombres='" + getNombres() + "'" +
            ", apellidos='" + getApellidos() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", fechaDefuncion='" + getFechaDefuncion() + "'" +
            ", nombresAlternativos='" + getNombresAlternativos() + "'" +
            ", apellidosAlternativos='" + getApellidosAlternativos() + "'" +
            ", sexo='" + isSexo() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            "}";
    }
}
