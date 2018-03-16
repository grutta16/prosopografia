package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Seccion;
import ar.gob.iighi.service.SeccionService;
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
 * REST controller for managing Seccion.
 */
@RestController
@RequestMapping("/api")
public class SeccionResource {

    private final Logger log = LoggerFactory.getLogger(SeccionResource.class);

    private static final String ENTITY_NAME = "seccion";

    private final SeccionService seccionService;

    public SeccionResource(SeccionService seccionService) {
        this.seccionService = seccionService;
    }

    /**
     * POST  /seccions : Create a new seccion.
     *
     * @param seccion the seccion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new seccion, or with status 400 (Bad Request) if the seccion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/seccions")
    @Timed
    public ResponseEntity<Seccion> createSeccion(@Valid @RequestBody Seccion seccion) throws URISyntaxException {
        log.debug("REST request to save Seccion : {}", seccion);
        if (seccion.getId() != null) {
            throw new BadRequestAlertException("A new seccion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Seccion result = seccionService.save(seccion);
        return ResponseEntity.created(new URI("/api/seccions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /seccions : Updates an existing seccion.
     *
     * @param seccion the seccion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated seccion,
     * or with status 400 (Bad Request) if the seccion is not valid,
     * or with status 500 (Internal Server Error) if the seccion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/seccions")
    @Timed
    public ResponseEntity<Seccion> updateSeccion(@Valid @RequestBody Seccion seccion) throws URISyntaxException {
        log.debug("REST request to update Seccion : {}", seccion);
        if (seccion.getId() == null) {
            return createSeccion(seccion);
        }
        Seccion result = seccionService.save(seccion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, seccion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /seccions : get all the seccions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of seccions in body
     */
    @GetMapping("/seccions")
    @Timed
    public ResponseEntity<List<Seccion>> getAllSeccions(Pageable pageable) {
        log.debug("REST request to get a page of Seccions");
        Page<Seccion> page = seccionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/seccions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /seccions/:id : get the "id" seccion.
     *
     * @param id the id of the seccion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the seccion, or with status 404 (Not Found)
     */
    @GetMapping("/seccions/{id}")
    @Timed
    public ResponseEntity<Seccion> getSeccion(@PathVariable Long id) {
        log.debug("REST request to get Seccion : {}", id);
        Seccion seccion = seccionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(seccion));
    }

    /**
     * DELETE  /seccions/:id : delete the "id" seccion.
     *
     * @param id the id of the seccion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/seccions/{id}")
    @Timed
    public ResponseEntity<Void> deleteSeccion(@PathVariable Long id) {
        log.debug("REST request to delete Seccion : {}", id);
        seccionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/seccions?query=:query : search for the seccion corresponding
     * to the query.
     *
     * @param query the query of the seccion search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/seccions")
    @Timed
    public ResponseEntity<List<Seccion>> searchSeccions(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Seccions for query {}", query);
        Page<Seccion> page = seccionService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/seccions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
