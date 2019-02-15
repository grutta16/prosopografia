package ar.gob.iighi.service;

import ar.gob.iighi.domain.Partido;
import ar.gob.iighi.repository.PartidoRepository;
import ar.gob.iighi.repository.search.PartidoSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Partido.
 */
@Service
@Transactional
public class PartidoService {

    private final Logger log = LoggerFactory.getLogger(PartidoService.class);

    private final PartidoRepository partidoRepository;

    private final PartidoSearchRepository partidoSearchRepository;

    public PartidoService(PartidoRepository partidoRepository, PartidoSearchRepository partidoSearchRepository) {
        this.partidoRepository = partidoRepository;
        this.partidoSearchRepository = partidoSearchRepository;
    }

    /**
     * Save a partido.
     *
     * @param partido the entity to save
     * @return the persisted entity
     */
    public Partido save(Partido partido) {
        log.debug("Request to save Partido : {}", partido);
        Partido result = partidoRepository.save(partido);
        partidoSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the partidos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Partido> findAll(Pageable pageable) {
        log.debug("Request to get all Partidos");
        return partidoRepository.findAll(pageable);
    }

    /**
     * Get one partido by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Partido findOne(Long id) {
        log.debug("Request to get Partido : {}", id);
        return partidoRepository.findOne(id);
    }

    /**
     * Delete the partido by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Partido : {}", id);
        partidoRepository.delete(id);
        partidoSearchRepository.delete(id);
    }

    /**
     * Search for the partido corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Partido> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Partidos for query {}", query);
        Page<Partido> result = partidoSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
