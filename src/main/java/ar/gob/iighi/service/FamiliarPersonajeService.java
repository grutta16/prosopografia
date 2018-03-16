package ar.gob.iighi.service;

import ar.gob.iighi.domain.FamiliarPersonaje;
import ar.gob.iighi.repository.FamiliarPersonajeRepository;
import ar.gob.iighi.repository.search.FamiliarPersonajeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing FamiliarPersonaje.
 */
@Service
@Transactional
public class FamiliarPersonajeService {

    private final Logger log = LoggerFactory.getLogger(FamiliarPersonajeService.class);

    private final FamiliarPersonajeRepository familiarPersonajeRepository;

    private final FamiliarPersonajeSearchRepository familiarPersonajeSearchRepository;

    public FamiliarPersonajeService(FamiliarPersonajeRepository familiarPersonajeRepository, FamiliarPersonajeSearchRepository familiarPersonajeSearchRepository) {
        this.familiarPersonajeRepository = familiarPersonajeRepository;
        this.familiarPersonajeSearchRepository = familiarPersonajeSearchRepository;
    }

    /**
     * Save a familiarPersonaje.
     *
     * @param familiarPersonaje the entity to save
     * @return the persisted entity
     */
    public FamiliarPersonaje save(FamiliarPersonaje familiarPersonaje) {
        log.debug("Request to save FamiliarPersonaje : {}", familiarPersonaje);
        FamiliarPersonaje result = familiarPersonajeRepository.save(familiarPersonaje);
        familiarPersonajeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the familiarPersonajes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<FamiliarPersonaje> findAll(Pageable pageable) {
        log.debug("Request to get all FamiliarPersonajes");
        return familiarPersonajeRepository.findAll(pageable);
    }

    /**
     * Get one familiarPersonaje by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public FamiliarPersonaje findOne(Long id) {
        log.debug("Request to get FamiliarPersonaje : {}", id);
        return familiarPersonajeRepository.findOne(id);
    }

    /**
     * Delete the familiarPersonaje by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FamiliarPersonaje : {}", id);
        familiarPersonajeRepository.delete(id);
        familiarPersonajeSearchRepository.delete(id);
    }

    /**
     * Search for the familiarPersonaje corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<FamiliarPersonaje> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of FamiliarPersonajes for query {}", query);
        Page<FamiliarPersonaje> result = familiarPersonajeSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
