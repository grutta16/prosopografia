package ar.gob.iighi.service;

import ar.gob.iighi.domain.CargoPersonaje;
import ar.gob.iighi.repository.CargoPersonajeRepository;
import ar.gob.iighi.repository.search.CargoPersonajeSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing CargoPersonaje.
 */
@Service
@Transactional
public class CargoPersonajeService {

    private final Logger log = LoggerFactory.getLogger(CargoPersonajeService.class);

    private final CargoPersonajeRepository cargoPersonajeRepository;

    private final CargoPersonajeSearchRepository cargoPersonajeSearchRepository;

    public CargoPersonajeService(CargoPersonajeRepository cargoPersonajeRepository, CargoPersonajeSearchRepository cargoPersonajeSearchRepository) {
        this.cargoPersonajeRepository = cargoPersonajeRepository;
        this.cargoPersonajeSearchRepository = cargoPersonajeSearchRepository;
    }

    /**
     * Save a cargoPersonaje.
     *
     * @param cargoPersonaje the entity to save
     * @return the persisted entity
     */
    public CargoPersonaje save(CargoPersonaje cargoPersonaje) {
        log.debug("Request to save CargoPersonaje : {}", cargoPersonaje);
        CargoPersonaje result = cargoPersonajeRepository.save(cargoPersonaje);
        cargoPersonajeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the cargoPersonajes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CargoPersonaje> findAll(Pageable pageable) {
        log.debug("Request to get all CargoPersonajes");
        return cargoPersonajeRepository.findAll(pageable);
    }

    /**
     * Get one cargoPersonaje by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CargoPersonaje findOne(Long id) {
        log.debug("Request to get CargoPersonaje : {}", id);
        return cargoPersonajeRepository.findOne(id);
    }

    /**
     * Delete the cargoPersonaje by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CargoPersonaje : {}", id);
        cargoPersonajeRepository.delete(id);
        cargoPersonajeSearchRepository.delete(id);
    }

    /**
     * Search for the cargoPersonaje corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CargoPersonaje> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of CargoPersonajes for query {}", query);
        Page<CargoPersonaje> result = cargoPersonajeSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
