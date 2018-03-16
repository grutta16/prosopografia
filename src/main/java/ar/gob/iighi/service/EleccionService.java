package ar.gob.iighi.service;

import ar.gob.iighi.domain.Eleccion;
import ar.gob.iighi.repository.EleccionRepository;
import ar.gob.iighi.repository.search.EleccionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Eleccion.
 */
@Service
@Transactional
public class EleccionService {

    private final Logger log = LoggerFactory.getLogger(EleccionService.class);

    private final EleccionRepository eleccionRepository;

    private final EleccionSearchRepository eleccionSearchRepository;

    public EleccionService(EleccionRepository eleccionRepository, EleccionSearchRepository eleccionSearchRepository) {
        this.eleccionRepository = eleccionRepository;
        this.eleccionSearchRepository = eleccionSearchRepository;
    }

    /**
     * Save a eleccion.
     *
     * @param eleccion the entity to save
     * @return the persisted entity
     */
    public Eleccion save(Eleccion eleccion) {
        log.debug("Request to save Eleccion : {}", eleccion);
        Eleccion result = eleccionRepository.save(eleccion);
        eleccionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the eleccions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Eleccion> findAll(Pageable pageable) {
        log.debug("Request to get all Eleccions");
        return eleccionRepository.findAll(pageable);
    }

    /**
     * Get one eleccion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Eleccion findOne(Long id) {
        log.debug("Request to get Eleccion : {}", id);
        return eleccionRepository.findOne(id);
    }

    /**
     * Delete the eleccion by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Eleccion : {}", id);
        eleccionRepository.delete(id);
        eleccionSearchRepository.delete(id);
    }

    /**
     * Search for the eleccion corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Eleccion> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Eleccions for query {}", query);
        Page<Eleccion> result = eleccionSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
