package ar.gob.iighi.service;

import ar.gob.iighi.domain.Lugar;
import ar.gob.iighi.repository.LugarRepository;
import ar.gob.iighi.repository.search.LugarSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Lugar.
 */
@Service
@Transactional
public class LugarService {

    private final Logger log = LoggerFactory.getLogger(LugarService.class);

    private final LugarRepository lugarRepository;

    private final LugarSearchRepository lugarSearchRepository;

    public LugarService(LugarRepository lugarRepository, LugarSearchRepository lugarSearchRepository) {
        this.lugarRepository = lugarRepository;
        this.lugarSearchRepository = lugarSearchRepository;
    }

    /**
     * Save a lugar.
     *
     * @param lugar the entity to save
     * @return the persisted entity
     */
    public Lugar save(Lugar lugar) {
        log.debug("Request to save Lugar : {}", lugar);
        Lugar result = lugarRepository.save(lugar);
        lugarSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the lugars.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Lugar> findAll(Pageable pageable) {
        log.debug("Request to get all Lugars");
        return lugarRepository.findAll(pageable);
    }

    /**
     * Get one lugar by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Lugar findOne(Long id) {
        log.debug("Request to get Lugar : {}", id);
        return lugarRepository.findOne(id);
    }

    /**
     * Delete the lugar by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Lugar : {}", id);
        lugarRepository.delete(id);
        lugarSearchRepository.delete(id);
    }

    /**
     * Search for the lugar corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Lugar> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Lugars for query {}", query);
        Page<Lugar> result = lugarSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
