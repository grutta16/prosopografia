package ar.gob.iighi.service;

import ar.gob.iighi.domain.Provincia;
import ar.gob.iighi.repository.ProvinciaRepository;
import ar.gob.iighi.repository.search.ProvinciaSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Provincia.
 */
@Service
@Transactional
public class ProvinciaService {

    private final Logger log = LoggerFactory.getLogger(ProvinciaService.class);

    private final ProvinciaRepository provinciaRepository;

    private final ProvinciaSearchRepository provinciaSearchRepository;

    public ProvinciaService(ProvinciaRepository provinciaRepository, ProvinciaSearchRepository provinciaSearchRepository) {
        this.provinciaRepository = provinciaRepository;
        this.provinciaSearchRepository = provinciaSearchRepository;
    }

    /**
     * Save a provincia.
     *
     * @param provincia the entity to save
     * @return the persisted entity
     */
    public Provincia save(Provincia provincia) {
        log.debug("Request to save Provincia : {}", provincia);
        Provincia result = provinciaRepository.save(provincia);
        provinciaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the provincias.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Provincia> findAll(Pageable pageable) {
        log.debug("Request to get all Provincias");
        return provinciaRepository.findAll(pageable);
    }

    /**
     * Get one provincia by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Provincia findOne(Long id) {
        log.debug("Request to get Provincia : {}", id);
        return provinciaRepository.findOne(id);
    }

    /**
     * Delete the provincia by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Provincia : {}", id);
        provinciaRepository.delete(id);
        provinciaSearchRepository.delete(id);
    }

    /**
     * Search for the provincia corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Provincia> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Provincias for query {}", query);
        Page<Provincia> result = provinciaSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }

    @Transactional(readOnly = true)
    public boolean existe(Provincia provincia) {
        log.debug("Request if exist Provincia : {}", provincia);
        for (Provincia p : provinciaRepository.findAll()) {
            if (p.equals(provincia) && !p.getId().equals(provincia.getId())) {
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
