package ar.gob.iighi.service;

import ar.gob.iighi.domain.Persona;
import ar.gob.iighi.repository.PersonaRepository;
import ar.gob.iighi.repository.search.PersonaSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Persona.
 */
@Service
@Transactional
public class PersonaService {

    private final Logger log = LoggerFactory.getLogger(PersonaService.class);

    private final PersonaRepository personaRepository;

    private final PersonaSearchRepository personaSearchRepository;

    public PersonaService(PersonaRepository personaRepository, PersonaSearchRepository personaSearchRepository) {
        this.personaRepository = personaRepository;
        this.personaSearchRepository = personaSearchRepository;
    }

    /**
     * Save a persona.
     *
     * @param persona the entity to save
     * @return the persisted entity
     */
    public Persona save(Persona persona) {
        log.debug("Request to save Persona : {}", persona);
        Persona result = personaRepository.save(persona);
        personaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the personas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Persona> findAll(Pageable pageable) {
        log.debug("Request to get all Personas");
        return personaRepository.findAll(pageable);
    }

    /**
     * Get one persona by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Persona findOne(Long id) {
        log.debug("Request to get Persona : {}", id);
        return personaRepository.findOne(id);
    }

    /**
     * Delete the persona by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Persona : {}", id);
        personaRepository.delete(id);
        personaSearchRepository.delete(id);
    }

    /**
     * Search for the persona corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Persona> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Personas for query {}", query);
        Page<Persona> result = personaSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
