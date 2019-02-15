package ar.gob.iighi.service;

import ar.gob.iighi.domain.DetCandidatura;
import ar.gob.iighi.repository.DetCandidaturaRepository;
import ar.gob.iighi.repository.search.DetCandidaturaSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing DetCandidatura.
 */
@Service
@Transactional
public class DetCandidaturaService {

    private final Logger log = LoggerFactory.getLogger(DetCandidaturaService.class);

    private final DetCandidaturaRepository detCandidaturaRepository;

    private final DetCandidaturaSearchRepository detCandidaturaSearchRepository;

    public DetCandidaturaService(DetCandidaturaRepository detCandidaturaRepository, DetCandidaturaSearchRepository detCandidaturaSearchRepository) {
        this.detCandidaturaRepository = detCandidaturaRepository;
        this.detCandidaturaSearchRepository = detCandidaturaSearchRepository;
    }

    /**
     * Save a detCandidatura.
     *
     * @param detCandidatura the entity to save
     * @return the persisted entity
     */
    public DetCandidatura save(DetCandidatura detCandidatura) {
        log.debug("Request to save DetCandidatura : {}", detCandidatura);
        DetCandidatura result = detCandidaturaRepository.save(detCandidatura);
        detCandidaturaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the detCandidaturas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DetCandidatura> findAll(Pageable pageable) {
        log.debug("Request to get all DetCandidaturas");
        return detCandidaturaRepository.findAll(pageable);
    }

    /**
     * Get one detCandidatura by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DetCandidatura findOne(Long id) {
        log.debug("Request to get DetCandidatura : {}", id);
        return detCandidaturaRepository.findOne(id);
    }

    /**
     * Delete the detCandidatura by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DetCandidatura : {}", id);
        detCandidaturaRepository.delete(id);
        detCandidaturaSearchRepository.delete(id);
    }

    /**
     * Search for the detCandidatura corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DetCandidatura> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of DetCandidaturas for query {}", query);
        Page<DetCandidatura> result = detCandidaturaSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
