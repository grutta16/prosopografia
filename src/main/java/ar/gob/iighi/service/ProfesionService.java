package ar.gob.iighi.service;

import ar.gob.iighi.domain.Profesion;
import ar.gob.iighi.repository.ProfesionRepository;
import ar.gob.iighi.repository.search.ProfesionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Profesion.
 */
@Service
@Transactional
public class ProfesionService {

    private final Logger log = LoggerFactory.getLogger(ProfesionService.class);

    private final ProfesionRepository profesionRepository;

    private final ProfesionSearchRepository profesionSearchRepository;

    public ProfesionService(ProfesionRepository profesionRepository, ProfesionSearchRepository profesionSearchRepository) {
        this.profesionRepository = profesionRepository;
        this.profesionSearchRepository = profesionSearchRepository;
    }

    /**
     * Save a profesion.
     *
     * @param profesion the entity to save
     * @return the persisted entity
     */
    public Profesion save(Profesion profesion) {
        log.debug("Request to save Profesion : {}", profesion);
        Profesion result = profesionRepository.save(profesion);
        profesionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the profesions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Profesion> findAll(Pageable pageable) {
        log.debug("Request to get all Profesions");
        return profesionRepository.findAll(pageable);
    }

    /**
     * Get one profesion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Profesion findOne(Long id) {
        log.debug("Request to get Profesion : {}", id);
        return profesionRepository.findOne(id);
    }

    /**
     * Delete the profesion by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Profesion : {}", id);
        profesionRepository.delete(id);
        profesionSearchRepository.delete(id);
    }

    /**
     * Search for the profesion corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Profesion> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Profesions for query {}", query);
        Page<Profesion> result = profesionSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
