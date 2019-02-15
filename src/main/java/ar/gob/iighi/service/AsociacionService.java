package ar.gob.iighi.service;

import ar.gob.iighi.domain.Asociacion;
import ar.gob.iighi.repository.AsociacionRepository;
import ar.gob.iighi.repository.search.AsociacionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Asociacion.
 */
@Service
@Transactional
public class AsociacionService {

    private final Logger log = LoggerFactory.getLogger(AsociacionService.class);

    private final AsociacionRepository asociacionRepository;

    private final AsociacionSearchRepository asociacionSearchRepository;

    public AsociacionService(AsociacionRepository asociacionRepository, AsociacionSearchRepository asociacionSearchRepository) {
        this.asociacionRepository = asociacionRepository;
        this.asociacionSearchRepository = asociacionSearchRepository;
    }

    /**
     * Save a asociacion.
     *
     * @param asociacion the entity to save
     * @return the persisted entity
     */
    public Asociacion save(Asociacion asociacion) {
        log.debug("Request to save Asociacion : {}", asociacion);
        Asociacion result = asociacionRepository.save(asociacion);
        asociacionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the asociacions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Asociacion> findAll(Pageable pageable) {
        log.debug("Request to get all Asociacions");
        return asociacionRepository.findAll(pageable);
    }

    /**
     * Get one asociacion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Asociacion findOne(Long id) {
        log.debug("Request to get Asociacion : {}", id);
        return asociacionRepository.findOne(id);
    }

    /**
     * Delete the asociacion by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Asociacion : {}", id);
        asociacionRepository.delete(id);
        asociacionSearchRepository.delete(id);
    }

    /**
     * Search for the asociacion corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Asociacion> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Asociacions for query {}", query);
        Page<Asociacion> result = asociacionSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
