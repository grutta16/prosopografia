package ar.gob.iighi.service;

import ar.gob.iighi.domain.ParejaPersonaje;
import ar.gob.iighi.repository.ParejaPersonajeRepository;
import ar.gob.iighi.repository.search.ParejaPersonajeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ParejaPersonaje.
 */
@Service
@Transactional
public class ParejaPersonajeService {

    private final Logger log = LoggerFactory.getLogger(ParejaPersonajeService.class);

    private final ParejaPersonajeRepository parejaPersonajeRepository;

    private final ParejaPersonajeSearchRepository parejaPersonajeSearchRepository;

    public ParejaPersonajeService(ParejaPersonajeRepository parejaPersonajeRepository, ParejaPersonajeSearchRepository parejaPersonajeSearchRepository) {
        this.parejaPersonajeRepository = parejaPersonajeRepository;
        this.parejaPersonajeSearchRepository = parejaPersonajeSearchRepository;
    }

    /**
     * Save a parejaPersonaje.
     *
     * @param parejaPersonaje the entity to save
     * @return the persisted entity
     */
    public ParejaPersonaje save(ParejaPersonaje parejaPersonaje) {
        log.debug("Request to save ParejaPersonaje : {}", parejaPersonaje);
        ParejaPersonaje result = parejaPersonajeRepository.save(parejaPersonaje);
        parejaPersonajeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the parejaPersonajes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ParejaPersonaje> findAll(Pageable pageable) {
        log.debug("Request to get all ParejaPersonajes");
        return parejaPersonajeRepository.findAll(pageable);
    }

    /**
     * Get one parejaPersonaje by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ParejaPersonaje findOne(Long id) {
        log.debug("Request to get ParejaPersonaje : {}", id);
        return parejaPersonajeRepository.findOne(id);
    }

    /**
     * Delete the parejaPersonaje by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ParejaPersonaje : {}", id);
        parejaPersonajeRepository.delete(id);
        parejaPersonajeSearchRepository.delete(id);
    }

    /**
     * Search for the parejaPersonaje corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ParejaPersonaje> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ParejaPersonajes for query {}", query);
        Page<ParejaPersonaje> result = parejaPersonajeSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
