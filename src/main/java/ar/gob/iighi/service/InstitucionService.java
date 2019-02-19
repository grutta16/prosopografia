package ar.gob.iighi.service;

import ar.gob.iighi.domain.Institucion;
import ar.gob.iighi.repository.InstitucionRepository;
import ar.gob.iighi.repository.search.InstitucionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Institucion.
 */
@Service
@Transactional
public class InstitucionService {

    private final Logger log = LoggerFactory.getLogger(InstitucionService.class);

    private final InstitucionRepository institucionRepository;

    private final InstitucionSearchRepository institucionSearchRepository;

    public InstitucionService(InstitucionRepository institucionRepository, InstitucionSearchRepository institucionSearchRepository) {
        this.institucionRepository = institucionRepository;
        this.institucionSearchRepository = institucionSearchRepository;
    }

    /**
     * Save a institucion.
     *
     * @param institucion the entity to save
     * @return the persisted entity
     */
    public Institucion save(Institucion institucion) {
        log.debug("Request to save Institucion : {}", institucion);
        Institucion result = institucionRepository.save(institucion);
        institucionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the institucions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Institucion> findAll(Pageable pageable) {
        log.debug("Request to get all Institucions");
        return institucionRepository.findAll(pageable);
    }

    /**
     * Get one institucion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Institucion findOne(Long id) {
        log.debug("Request to get Institucion : {}", id);
        return institucionRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the institucion by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Institucion : {}", id);
        institucionRepository.delete(id);
        institucionSearchRepository.delete(id);
    }

    /**
     * Search for the institucion corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Institucion> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Institucions for query {}", query);
        Page<Institucion> result = institucionSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }

    @Transactional(readOnly = true)
    public boolean existe(Institucion institucion) {
        log.debug("Request if exist Institucion : {}", institucion);
        for (Institucion i : institucionRepository.findAll()) {
            if (i.equals(institucion) && !i.getId().equals(institucion.getId())) {
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
