package ar.gob.iighi.service;

import ar.gob.iighi.domain.EstudioPersonaje;
import ar.gob.iighi.repository.EstudioPersonajeRepository;
import ar.gob.iighi.repository.search.EstudioPersonajeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing EstudioPersonaje.
 */
@Service
@Transactional
public class EstudioPersonajeService {

    private final Logger log = LoggerFactory.getLogger(EstudioPersonajeService.class);

    private final EstudioPersonajeRepository estudioPersonajeRepository;

    private final EstudioPersonajeSearchRepository estudioPersonajeSearchRepository;

    public EstudioPersonajeService(EstudioPersonajeRepository estudioPersonajeRepository, EstudioPersonajeSearchRepository estudioPersonajeSearchRepository) {
        this.estudioPersonajeRepository = estudioPersonajeRepository;
        this.estudioPersonajeSearchRepository = estudioPersonajeSearchRepository;
    }

    /**
     * Save a estudioPersonaje.
     *
     * @param estudioPersonaje the entity to save
     * @return the persisted entity
     */
    public EstudioPersonaje save(EstudioPersonaje estudioPersonaje) {
        log.debug("Request to save EstudioPersonaje : {}", estudioPersonaje);
        EstudioPersonaje result = estudioPersonajeRepository.save(estudioPersonaje);
        estudioPersonajeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the estudioPersonajes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<EstudioPersonaje> findAll(Pageable pageable) {
        log.debug("Request to get all EstudioPersonajes");
        return estudioPersonajeRepository.findAll(pageable);
    }

    /**
     * Get one estudioPersonaje by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public EstudioPersonaje findOne(Long id) {
        log.debug("Request to get EstudioPersonaje : {}", id);
        return estudioPersonajeRepository.findOne(id);
    }

    /**
     * Delete the estudioPersonaje by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete EstudioPersonaje : {}", id);
        estudioPersonajeRepository.delete(id);
        estudioPersonajeSearchRepository.delete(id);
    }

    /**
     * Search for the estudioPersonaje corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<EstudioPersonaje> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of EstudioPersonajes for query {}", query);
        Page<EstudioPersonaje> result = estudioPersonajeSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
