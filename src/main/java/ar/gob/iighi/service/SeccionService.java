package ar.gob.iighi.service;

import ar.gob.iighi.domain.Seccion;
import ar.gob.iighi.repository.SeccionRepository;
import ar.gob.iighi.repository.search.SeccionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Seccion.
 */
@Service
@Transactional
public class SeccionService {

    private final Logger log = LoggerFactory.getLogger(SeccionService.class);

    private final SeccionRepository seccionRepository;

    private final SeccionSearchRepository seccionSearchRepository;

    public SeccionService(SeccionRepository seccionRepository, SeccionSearchRepository seccionSearchRepository) {
        this.seccionRepository = seccionRepository;
        this.seccionSearchRepository = seccionSearchRepository;
    }

    /**
     * Save a seccion.
     *
     * @param seccion the entity to save
     * @return the persisted entity
     */
    public Seccion save(Seccion seccion) {
        log.debug("Request to save Seccion : {}", seccion);
        Seccion result = seccionRepository.save(seccion);
        seccionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the seccions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Seccion> findAll(Pageable pageable) {
        log.debug("Request to get all Seccions");
        return seccionRepository.findAll(pageable);
    }

    /**
     * Get one seccion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Seccion findOne(Long id) {
        log.debug("Request to get Seccion : {}", id);
        return seccionRepository.findOne(id);
    }

    /**
     * Delete the seccion by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Seccion : {}", id);
        seccionRepository.delete(id);
        seccionSearchRepository.delete(id);
    }

    /**
     * Search for the seccion corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Seccion> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Seccions for query {}", query);
        Page<Seccion> result = seccionSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
