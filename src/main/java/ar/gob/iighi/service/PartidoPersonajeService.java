package ar.gob.iighi.service;

import ar.gob.iighi.domain.PartidoPersonaje;
import ar.gob.iighi.repository.PartidoPersonajeRepository;
import ar.gob.iighi.repository.search.PartidoPersonajeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing PartidoPersonaje.
 */
@Service
@Transactional
public class PartidoPersonajeService {

    private final Logger log = LoggerFactory.getLogger(PartidoPersonajeService.class);

    private final PartidoPersonajeRepository partidoPersonajeRepository;

    private final PartidoPersonajeSearchRepository partidoPersonajeSearchRepository;

    public PartidoPersonajeService(PartidoPersonajeRepository partidoPersonajeRepository, PartidoPersonajeSearchRepository partidoPersonajeSearchRepository) {
        this.partidoPersonajeRepository = partidoPersonajeRepository;
        this.partidoPersonajeSearchRepository = partidoPersonajeSearchRepository;
    }

    /**
     * Save a partidoPersonaje.
     *
     * @param partidoPersonaje the entity to save
     * @return the persisted entity
     */
    public PartidoPersonaje save(PartidoPersonaje partidoPersonaje) {
        log.debug("Request to save PartidoPersonaje : {}", partidoPersonaje);
        PartidoPersonaje result = partidoPersonajeRepository.save(partidoPersonaje);
        partidoPersonajeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the partidoPersonajes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PartidoPersonaje> findAll(Pageable pageable) {
        log.debug("Request to get all PartidoPersonajes");
        return partidoPersonajeRepository.findAll(pageable);
    }

    /**
     * Get one partidoPersonaje by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PartidoPersonaje findOne(Long id) {
        log.debug("Request to get PartidoPersonaje : {}", id);
        return partidoPersonajeRepository.findOne(id);
    }

    /**
     * Delete the partidoPersonaje by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PartidoPersonaje : {}", id);
        partidoPersonajeRepository.delete(id);
        partidoPersonajeSearchRepository.delete(id);
    }

    /**
     * Search for the partidoPersonaje corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PartidoPersonaje> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of PartidoPersonajes for query {}", query);
        Page<PartidoPersonaje> result = partidoPersonajeSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
