package ar.gob.iighi.service;

import ar.gob.iighi.domain.RelacionFamiliar;
import ar.gob.iighi.repository.RelacionFamiliarRepository;
import ar.gob.iighi.repository.search.RelacionFamiliarSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing RelacionFamiliar.
 */
@Service
@Transactional
public class RelacionFamiliarService {

    private final Logger log = LoggerFactory.getLogger(RelacionFamiliarService.class);

    private final RelacionFamiliarRepository relacionFamiliarRepository;

    private final RelacionFamiliarSearchRepository relacionFamiliarSearchRepository;

    public RelacionFamiliarService(RelacionFamiliarRepository relacionFamiliarRepository, RelacionFamiliarSearchRepository relacionFamiliarSearchRepository) {
        this.relacionFamiliarRepository = relacionFamiliarRepository;
        this.relacionFamiliarSearchRepository = relacionFamiliarSearchRepository;
    }

    /**
     * Save a relacionFamiliar.
     *
     * @param relacionFamiliar the entity to save
     * @return the persisted entity
     */
    public RelacionFamiliar save(RelacionFamiliar relacionFamiliar) {
        log.debug("Request to save RelacionFamiliar : {}", relacionFamiliar);
        RelacionFamiliar result = relacionFamiliarRepository.save(relacionFamiliar);
        relacionFamiliarSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the relacionFamiliars.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<RelacionFamiliar> findAll(Pageable pageable) {
        log.debug("Request to get all RelacionFamiliars");
        return relacionFamiliarRepository.findAll(pageable);
    }

    /**
     * Get one relacionFamiliar by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public RelacionFamiliar findOne(Long id) {
        log.debug("Request to get RelacionFamiliar : {}", id);
        return relacionFamiliarRepository.findOne(id);
    }

    /**
     * Delete the relacionFamiliar by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete RelacionFamiliar : {}", id);
        relacionFamiliarRepository.delete(id);
        relacionFamiliarSearchRepository.delete(id);
    }

    /**
     * Search for the relacionFamiliar corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<RelacionFamiliar> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of RelacionFamiliars for query {}", query);
        Page<RelacionFamiliar> result = relacionFamiliarSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
