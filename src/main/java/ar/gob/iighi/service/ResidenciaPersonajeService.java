package ar.gob.iighi.service;

import ar.gob.iighi.domain.ResidenciaPersonaje;
import ar.gob.iighi.repository.ResidenciaPersonajeRepository;
import ar.gob.iighi.repository.search.ResidenciaPersonajeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ResidenciaPersonaje.
 */
@Service
@Transactional
public class ResidenciaPersonajeService {

    private final Logger log = LoggerFactory.getLogger(ResidenciaPersonajeService.class);

    private final ResidenciaPersonajeRepository residenciaPersonajeRepository;

    private final ResidenciaPersonajeSearchRepository residenciaPersonajeSearchRepository;

    public ResidenciaPersonajeService(ResidenciaPersonajeRepository residenciaPersonajeRepository, ResidenciaPersonajeSearchRepository residenciaPersonajeSearchRepository) {
        this.residenciaPersonajeRepository = residenciaPersonajeRepository;
        this.residenciaPersonajeSearchRepository = residenciaPersonajeSearchRepository;
    }

    /**
     * Save a residenciaPersonaje.
     *
     * @param residenciaPersonaje the entity to save
     * @return the persisted entity
     */
    public ResidenciaPersonaje save(ResidenciaPersonaje residenciaPersonaje) {
        log.debug("Request to save ResidenciaPersonaje : {}", residenciaPersonaje);
        ResidenciaPersonaje result = residenciaPersonajeRepository.save(residenciaPersonaje);
        residenciaPersonajeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the residenciaPersonajes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ResidenciaPersonaje> findAll(Pageable pageable) {
        log.debug("Request to get all ResidenciaPersonajes");
        return residenciaPersonajeRepository.findAll(pageable);
    }

    /**
     * Get one residenciaPersonaje by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ResidenciaPersonaje findOne(Long id) {
        log.debug("Request to get ResidenciaPersonaje : {}", id);
        return residenciaPersonajeRepository.findOne(id);
    }

    /**
     * Delete the residenciaPersonaje by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ResidenciaPersonaje : {}", id);
        residenciaPersonajeRepository.delete(id);
        residenciaPersonajeSearchRepository.delete(id);
    }

    /**
     * Search for the residenciaPersonaje corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ResidenciaPersonaje> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ResidenciaPersonajes for query {}", query);
        Page<ResidenciaPersonaje> result = residenciaPersonajeSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
