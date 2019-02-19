package ar.gob.iighi.service;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.domain.*; // for static metamodels
import ar.gob.iighi.repository.PersonajeRepository;
import ar.gob.iighi.repository.search.PersonajeSearchRepository;
import ar.gob.iighi.service.dto.PersonajeCriteria;


/**
 * Service for executing complex queries for Personaje entities in the database.
 * The main input is a {@link PersonajeCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Personaje} or a {@link Page} of {@link Personaje} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PersonajeQueryService extends QueryService<Personaje> {

    private final Logger log = LoggerFactory.getLogger(PersonajeQueryService.class);


    private final PersonajeRepository personajeRepository;

    private final PersonajeSearchRepository personajeSearchRepository;

    public PersonajeQueryService(PersonajeRepository personajeRepository, PersonajeSearchRepository personajeSearchRepository) {
        this.personajeRepository = personajeRepository;
        this.personajeSearchRepository = personajeSearchRepository;
    }

    /**
     * Return a {@link List} of {@link Personaje} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Personaje> findByCriteria(PersonajeCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Personaje> specification = createSpecification(criteria);
        return personajeRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Personaje} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Personaje> findByCriteria(PersonajeCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Personaje> specification = createSpecification(criteria);
        return personajeRepository.findAll(specification, page);
    }

    /**
     * Function to convert PersonajeCriteria to a {@link Specifications}
     */
    private Specifications<Personaje> createSpecification(PersonajeCriteria criteria) {
        Specifications<Personaje> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Personaje_.id));
            }
            if (criteria.getNombres() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombres(), Personaje_.nombres));
            }
            if (criteria.getApellidos() != null) {
                specification = specification.and(buildStringSpecification(criteria.getApellidos(), Personaje_.apellidos));
            }
            if (criteria.getFechaNacimiento() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaNacimiento(), Personaje_.fechaNacimiento));
            }
            if (criteria.getFechaDefuncion() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaDefuncion(), Personaje_.fechaDefuncion));
            }
            if (criteria.getNombresAlternativos() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombresAlternativos(), Personaje_.nombresAlternativos));
            }
            if (criteria.getApellidosAlternativos() != null) {
                specification = specification.and(buildStringSpecification(criteria.getApellidosAlternativos(), Personaje_.apellidosAlternativos));
            }
            if (criteria.getSexo() != null) {
                specification = specification.and(buildSpecification(criteria.getSexo(), Personaje_.sexo));
            }
            if (criteria.getObservaciones() != null) {
                specification = specification.and(buildStringSpecification(criteria.getObservaciones(), Personaje_.observaciones));
            }
            if (criteria.getLugarNacimientoId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getLugarNacimientoId(), Personaje_.lugarNacimiento, Lugar_.id));
            }
            if (criteria.getLugarDefuncionId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getLugarDefuncionId(), Personaje_.lugarDefuncion, Lugar_.id));
            }
            if (criteria.getProfesionesId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getProfesionesId(), Personaje_.profesiones, Profesion_.id));
            }
            if (criteria.getParejasId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getParejasId(), Personaje_.parejas, ParejaPersonaje_.id));
            }
            if (criteria.getFamiliaresId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getFamiliaresId(), Personaje_.familiares, FamiliarPersonaje_.id));
            }
            if (criteria.getEstudiosId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getEstudiosId(), Personaje_.estudios, EstudioPersonaje_.id));
            }
//            if (criteria.getAsociacionesId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getAsociacionesId(), Personaje_.asociaciones, AsociacionPersonaje_.id));
//            }
            if (criteria.getPartidosId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getPartidosId(), Personaje_.partidos, PartidoPersonaje_.id));
            }
//            if (criteria.getReligionesId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getReligionesId(), Personaje_.religiones, ReligionPersonaje_.id));
//            }
            if (criteria.getResidenciasId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getResidenciasId(), Personaje_.residencias, ResidenciaPersonaje_.id));
            }
            if (criteria.getCargosId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getCargosId(), Personaje_.cargos, CargoPersonaje_.id));
            }
            if (criteria.getCandidaturasId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getCandidaturasId(), Personaje_.candidaturas, Candidatura_.id));
            }
        }
        return specification;
    }

}
