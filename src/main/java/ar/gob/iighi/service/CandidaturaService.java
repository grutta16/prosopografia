package ar.gob.iighi.service;

import ar.gob.iighi.domain.Candidatura;
import ar.gob.iighi.repository.CandidaturaRepository;
import ar.gob.iighi.repository.search.CandidaturaSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Candidatura.
 */
@Service
@Transactional
public class CandidaturaService {

    private final Logger log = LoggerFactory.getLogger(CandidaturaService.class);

    private final CandidaturaRepository candidaturaRepository;

    private final CandidaturaSearchRepository candidaturaSearchRepository;

    public CandidaturaService(CandidaturaRepository candidaturaRepository, CandidaturaSearchRepository candidaturaSearchRepository) {
        this.candidaturaRepository = candidaturaRepository;
        this.candidaturaSearchRepository = candidaturaSearchRepository;
    }

    /**
     * Save a candidatura.
     *
     * @param candidatura the entity to save
     * @return the persisted entity
     */
    public Candidatura save(Candidatura candidatura) {
        log.debug("Request to save Candidatura : {}", candidatura);
        Candidatura result = candidaturaRepository.save(candidatura);
        candidaturaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the candidaturas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Candidatura> findAll(Pageable pageable) {
        log.debug("Request to get all Candidaturas");
        return candidaturaRepository.findAll(pageable);
    }

    /**
     * Get one candidatura by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Candidatura findOne(Long id) {
        log.debug("Request to get Candidatura : {}", id);
        return candidaturaRepository.findOne(id);
    }

    /**
     * Delete the candidatura by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Candidatura : {}", id);
        candidaturaRepository.delete(id);
        candidaturaSearchRepository.delete(id);
    }

    /**
     * Search for the candidatura corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Candidatura> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Candidaturas for query {}", query);
        Page<Candidatura> result = candidaturaSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
