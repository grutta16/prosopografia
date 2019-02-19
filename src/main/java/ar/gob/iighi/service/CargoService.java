package ar.gob.iighi.service;

import ar.gob.iighi.domain.Cargo;
import ar.gob.iighi.repository.CargoRepository;
import ar.gob.iighi.repository.search.CargoSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Cargo.
 */
@Service
@Transactional
public class CargoService {

    private final Logger log = LoggerFactory.getLogger(CargoService.class);

    private final CargoRepository cargoRepository;

    private final CargoSearchRepository cargoSearchRepository;

    public CargoService(CargoRepository cargoRepository, CargoSearchRepository cargoSearchRepository) {
        this.cargoRepository = cargoRepository;
        this.cargoSearchRepository = cargoSearchRepository;
    }

    /**
     * Save a cargo.
     *
     * @param cargo the entity to save
     * @return the persisted entity
     */
    public Cargo save(Cargo cargo) {
        log.debug("Request to save Cargo : {}", cargo);
        Cargo result = cargoRepository.save(cargo);
        cargoSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the cargos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Cargo> findAll(Pageable pageable) {
        log.debug("Request to get all Cargos");
        return cargoRepository.findAll(pageable);
    }

    /**
     * Get one cargo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Cargo findOne(Long id) {
        log.debug("Request to get Cargo : {}", id);
        return cargoRepository.findOne(id);
    }

    /**
     * Delete the cargo by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Cargo : {}", id);
        cargoRepository.delete(id);
        cargoSearchRepository.delete(id);
    }

    /**
     * Search for the cargo corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Cargo> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Cargos for query {}", query);
        Page<Cargo> result = cargoSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }

    @Transactional(readOnly = true)
    public boolean existe(Cargo cargo) {
        log.debug("Request if exist Cargo : {}", cargo);
        for (Cargo c : cargoRepository.findAll()) {
            if (c.equals(cargo) && !c.getId().equals(cargo.getId())) {
                return true;
            }
        }
        return false;
    }

//    @Transactional(readOnly = true)
//    private void esDescriptorUsado(long id) {
//        Descriptor descriptor = repositorio.findOne(id);
//        if (!descriptor.getFotografias().isEmpty()) {
//            throw new EliminarObjetoEnUsoExcepcion("El descriptor <strong>" + descriptor.getNombre() + "</strong> no se puede eliminar porque tiene fotograf�as asociadas");
//        }
//    }
}
