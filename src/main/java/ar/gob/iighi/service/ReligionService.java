package ar.gob.iighi.service;

import ar.gob.iighi.domain.Religion;
import ar.gob.iighi.repository.ReligionRepository;
import ar.gob.iighi.repository.search.ReligionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Religion.
 */
@Service
@Transactional
public class ReligionService {

    private final Logger log = LoggerFactory.getLogger(ReligionService.class);

    private final ReligionRepository religionRepository;

    private final ReligionSearchRepository religionSearchRepository;

    public ReligionService(ReligionRepository religionRepository, ReligionSearchRepository religionSearchRepository) {
        this.religionRepository = religionRepository;
        this.religionSearchRepository = religionSearchRepository;
    }

    /**
     * Save a religion.
     *
     * @param religion the entity to save
     * @return the persisted entity
     */
    public Religion save(Religion religion) {
        log.debug("Request to save Religion : {}", religion);
        Religion result = religionRepository.save(religion);
        religionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the religions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Religion> findAll(Pageable pageable) {
        log.debug("Request to get all Religions");
        return religionRepository.findAll(pageable);
    }

    /**
     * Get one religion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Religion findOne(Long id) {
        log.debug("Request to get Religion : {}", id);
        return religionRepository.findOne(id);
    }

    /**
     * Delete the religion by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Religion : {}", id);
        religionRepository.delete(id);
        religionSearchRepository.delete(id);
    }

    /**
     * Search for the religion corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Religion> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Religions for query {}", query);
        Page<Religion> result = religionSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }

    @Transactional(readOnly = true)
    public boolean existe(Religion religion) {
        log.debug("Request if exist Religion : {}", religion);
        for (Religion r : religionRepository.findAll()) {
            if (r.equals(religion) && !r.getId().equals(religion.getId())) {
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
