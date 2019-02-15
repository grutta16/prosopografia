package ar.gob.iighi.service;

import ar.gob.iighi.domain.TipoProfesion;
import ar.gob.iighi.repository.TipoProfesionRepository;
import ar.gob.iighi.repository.search.TipoProfesionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TipoProfesion.
 */
@Service
@Transactional
public class TipoProfesionService {

    private final Logger log = LoggerFactory.getLogger(TipoProfesionService.class);

    private final TipoProfesionRepository tipoProfesionRepository;

    private final TipoProfesionSearchRepository tipoProfesionSearchRepository;

    public TipoProfesionService(TipoProfesionRepository tipoProfesionRepository, TipoProfesionSearchRepository tipoProfesionSearchRepository) {
        this.tipoProfesionRepository = tipoProfesionRepository;
        this.tipoProfesionSearchRepository = tipoProfesionSearchRepository;
    }

    /**
     * Save a tipoProfesion.
     *
     * @param tipoProfesion the entity to save
     * @return the persisted entity
     */
    public TipoProfesion save(TipoProfesion tipoProfesion) {
        log.debug("Request to save TipoProfesion : {}", tipoProfesion);
        TipoProfesion result = tipoProfesionRepository.save(tipoProfesion);
        tipoProfesionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the tipoProfesions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TipoProfesion> findAll(Pageable pageable) {
        log.debug("Request to get all TipoProfesions");
        return tipoProfesionRepository.findAll(pageable);
    }

    /**
     * Get one tipoProfesion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public TipoProfesion findOne(Long id) {
        log.debug("Request to get TipoProfesion : {}", id);
        return tipoProfesionRepository.findOne(id);
    }

    /**
     * Delete the tipoProfesion by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TipoProfesion : {}", id);
        tipoProfesionRepository.delete(id);
        tipoProfesionSearchRepository.delete(id);
    }

    /**
     * Search for the tipoProfesion corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TipoProfesion> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of TipoProfesions for query {}", query);
        Page<TipoProfesion> result = tipoProfesionSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
