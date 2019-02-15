package ar.gob.iighi.service;

import ar.gob.iighi.domain.Carrera;
import ar.gob.iighi.repository.CarreraRepository;
import ar.gob.iighi.repository.search.CarreraSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Carrera.
 */
@Service
@Transactional
public class CarreraService {

    private final Logger log = LoggerFactory.getLogger(CarreraService.class);

    private final CarreraRepository carreraRepository;

    private final CarreraSearchRepository carreraSearchRepository;

    public CarreraService(CarreraRepository carreraRepository, CarreraSearchRepository carreraSearchRepository) {
        this.carreraRepository = carreraRepository;
        this.carreraSearchRepository = carreraSearchRepository;
    }

    /**
     * Save a carrera.
     *
     * @param carrera the entity to save
     * @return the persisted entity
     */
    public Carrera save(Carrera carrera) {
        log.debug("Request to save Carrera : {}", carrera);
        Carrera result = carreraRepository.save(carrera);
        carreraSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the carreras.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Carrera> findAll(Pageable pageable) {
        log.debug("Request to get all Carreras");
        return carreraRepository.findAll(pageable);
    }

    /**
     * Get one carrera by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Carrera findOne(Long id) {
        log.debug("Request to get Carrera : {}", id);
        return carreraRepository.findOne(id);
    }

    /**
     * Delete the carrera by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Carrera : {}", id);
        carreraRepository.delete(id);
        carreraSearchRepository.delete(id);
    }

    /**
     * Search for the carrera corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Carrera> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Carreras for query {}", query);
        Page<Carrera> result = carreraSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
