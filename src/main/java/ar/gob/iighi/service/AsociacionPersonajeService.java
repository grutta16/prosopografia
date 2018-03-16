package ar.gob.iighi.service;

import ar.gob.iighi.domain.AsociacionPersonaje;
import ar.gob.iighi.repository.AsociacionPersonajeRepository;
import ar.gob.iighi.repository.search.AsociacionPersonajeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing AsociacionPersonaje.
 */
@Service
@Transactional
public class AsociacionPersonajeService {

    private final Logger log = LoggerFactory.getLogger(AsociacionPersonajeService.class);

    private final AsociacionPersonajeRepository asociacionPersonajeRepository;

    private final AsociacionPersonajeSearchRepository asociacionPersonajeSearchRepository;

    public AsociacionPersonajeService(AsociacionPersonajeRepository asociacionPersonajeRepository, AsociacionPersonajeSearchRepository asociacionPersonajeSearchRepository) {
        this.asociacionPersonajeRepository = asociacionPersonajeRepository;
        this.asociacionPersonajeSearchRepository = asociacionPersonajeSearchRepository;
    }

    /**
     * Save a asociacionPersonaje.
     *
     * @param asociacionPersonaje the entity to save
     * @return the persisted entity
     */
    public AsociacionPersonaje save(AsociacionPersonaje asociacionPersonaje) {
        log.debug("Request to save AsociacionPersonaje : {}", asociacionPersonaje);
        AsociacionPersonaje result = asociacionPersonajeRepository.save(asociacionPersonaje);
        asociacionPersonajeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the asociacionPersonajes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<AsociacionPersonaje> findAll(Pageable pageable) {
        log.debug("Request to get all AsociacionPersonajes");
        return asociacionPersonajeRepository.findAll(pageable);
    }

    /**
     * Get one asociacionPersonaje by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public AsociacionPersonaje findOne(Long id) {
        log.debug("Request to get AsociacionPersonaje : {}", id);
        return asociacionPersonajeRepository.findOne(id);
    }

    /**
     * Delete the asociacionPersonaje by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete AsociacionPersonaje : {}", id);
        asociacionPersonajeRepository.delete(id);
        asociacionPersonajeSearchRepository.delete(id);
    }

    /**
     * Search for the asociacionPersonaje corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<AsociacionPersonaje> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of AsociacionPersonajes for query {}", query);
        Page<AsociacionPersonaje> result = asociacionPersonajeSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
