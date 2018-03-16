package ar.gob.iighi.service;

import ar.gob.iighi.domain.ReligionPersonaje;
import ar.gob.iighi.repository.ReligionPersonajeRepository;
import ar.gob.iighi.repository.search.ReligionPersonajeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ReligionPersonaje.
 */
@Service
@Transactional
public class ReligionPersonajeService {

    private final Logger log = LoggerFactory.getLogger(ReligionPersonajeService.class);

    private final ReligionPersonajeRepository religionPersonajeRepository;

    private final ReligionPersonajeSearchRepository religionPersonajeSearchRepository;

    public ReligionPersonajeService(ReligionPersonajeRepository religionPersonajeRepository, ReligionPersonajeSearchRepository religionPersonajeSearchRepository) {
        this.religionPersonajeRepository = religionPersonajeRepository;
        this.religionPersonajeSearchRepository = religionPersonajeSearchRepository;
    }

    /**
     * Save a religionPersonaje.
     *
     * @param religionPersonaje the entity to save
     * @return the persisted entity
     */
    public ReligionPersonaje save(ReligionPersonaje religionPersonaje) {
        log.debug("Request to save ReligionPersonaje : {}", religionPersonaje);
        ReligionPersonaje result = religionPersonajeRepository.save(religionPersonaje);
        religionPersonajeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the religionPersonajes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ReligionPersonaje> findAll(Pageable pageable) {
        log.debug("Request to get all ReligionPersonajes");
        return religionPersonajeRepository.findAll(pageable);
    }

    /**
     * Get one religionPersonaje by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ReligionPersonaje findOne(Long id) {
        log.debug("Request to get ReligionPersonaje : {}", id);
        return religionPersonajeRepository.findOne(id);
    }

    /**
     * Delete the religionPersonaje by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ReligionPersonaje : {}", id);
        religionPersonajeRepository.delete(id);
        religionPersonajeSearchRepository.delete(id);
    }

    /**
     * Search for the religionPersonaje corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ReligionPersonaje> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ReligionPersonajes for query {}", query);
        Page<ReligionPersonaje> result = religionPersonajeSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
