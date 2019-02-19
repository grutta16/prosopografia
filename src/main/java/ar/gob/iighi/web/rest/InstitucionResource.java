package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Institucion;
import ar.gob.iighi.service.InstitucionService;
import ar.gob.iighi.web.rest.errors.BadRequestAlertException;
import ar.gob.iighi.web.rest.util.HeaderUtil;
import ar.gob.iighi.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Institucion.
 */
@RestController
@RequestMapping("/api")
public class InstitucionResource {

    private final Logger log = LoggerFactory.getLogger(InstitucionResource.class);

    private static final String ENTITY_NAME = "institucion";

    private final InstitucionService institucionService;

    public InstitucionResource(InstitucionService institucionService) {
        this.institucionService = institucionService;
    }

    /**
     * POST  /institucions : Create a new institucion.
     *
     * @param institucion the institucion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new institucion, or with status 400 (Bad Request) if the institucion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/institucions")
    @Timed
    public ResponseEntity<Institucion> createInstitucion(@Valid @RequestBody Institucion institucion) throws URISyntaxException {
        log.debug("REST request to save Institucion : {}", institucion);
        if (institucion.getId() != null) {
            throw new BadRequestAlertException("A new institucion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (institucionService.existe(institucion)) {
            throw new BadRequestAlertException("Duplicado: un registro de institución con esos datos ya existe", ENTITY_NAME, "duplicated");
        }
        Institucion result = institucionService.save(institucion);
        return ResponseEntity.created(new URI("/api/institucions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /institucions : Updates an existing institucion.
     *
     * @param institucion the institucion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated institucion,
     * or with status 400 (Bad Request) if the institucion is not valid,
     * or with status 500 (Internal Server Error) if the institucion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/institucions")
    @Timed
    public ResponseEntity<Institucion> updateInstitucion(@Valid @RequestBody Institucion institucion) throws URISyntaxException {
        log.debug("REST request to update Institucion : {}", institucion);
        if (institucion.getId() == null) {
            return createInstitucion(institucion);
        }
        if (institucionService.existe(institucion)) {
            throw new BadRequestAlertException("Duplicado: un registro de institución con esos datos ya existe", ENTITY_NAME, "duplicated");
        }
        Institucion result = institucionService.save(institucion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, institucion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /institucions : get all the institucions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of institucions in body
     */
    @GetMapping("/institucions")
    @Timed
    public ResponseEntity<List<Institucion>> getAllInstitucions(Pageable pageable) {
        log.debug("REST request to get a page of Institucions");
        Page<Institucion> page = institucionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/institucions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /institucions/:id : get the "id" institucion.
     *
     * @param id the id of the institucion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the institucion, or with status 404 (Not Found)
     */
    @GetMapping("/institucions/{id}")
    @Timed
    public ResponseEntity<Institucion> getInstitucion(@PathVariable Long id) {
        log.debug("REST request to get Institucion : {}", id);
        Institucion institucion = institucionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(institucion));
    }

    /**
     * DELETE  /institucions/:id : delete the "id" institucion.
     *
     * @param id the id of the institucion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/institucions/{id}")
    @Timed
    public ResponseEntity<Void> deleteInstitucion(@PathVariable Long id) {
        log.debug("REST request to delete Institucion : {}", id);
        institucionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/institucions?query=:query : search for the institucion corresponding
     * to the query.
     *
     * @param query the query of the institucion search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/institucions")
    @Timed
    public ResponseEntity<List<Institucion>> searchInstitucions(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Institucions for query {}", query);
//        Page<Institucion> page = institucionService.search(query, pageable);
        Page<Institucion> page = institucionService.search(query + "*", pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/institucions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
