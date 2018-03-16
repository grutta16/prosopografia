package ar.gob.iighi.service;

import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.repository.PersonajeRepository;
import ar.gob.iighi.repository.search.PersonajeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Personaje.
 */
@Service
@Transactional
public class PersonajeService {

    private final Logger log = LoggerFactory.getLogger(PersonajeService.class);

    private final PersonajeRepository personajeRepository;

    private final PersonajeSearchRepository personajeSearchRepository;

    public PersonajeService(PersonajeRepository personajeRepository, PersonajeSearchRepository personajeSearchRepository) {
        this.personajeRepository = personajeRepository;
        this.personajeSearchRepository = personajeSearchRepository;
    }

    /**
     * Save a personaje.
     *
     * @param personaje the entity to save
     * @return the persisted entity
     */
    public Personaje save(Personaje personaje) {
        log.debug("Request to save Personaje : {}", personaje);
        Personaje result = personajeRepository.save(personaje);
        personajeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the personajes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Personaje> findAll(Pageable pageable) {
        log.debug("Request to get all Personajes");
        return personajeRepository.findAll(pageable);
    }

    /**
     * Get one personaje by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Personaje findOne(Long id) {
        log.debug("Request to get Personaje : {}", id);
        return personajeRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the personaje by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Personaje : {}", id);
        personajeRepository.delete(id);
        personajeSearchRepository.delete(id);
    }

    /**
     * Search for the personaje corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Personaje> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Personajes for query {}", query);
        Page<Personaje> result = personajeSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
