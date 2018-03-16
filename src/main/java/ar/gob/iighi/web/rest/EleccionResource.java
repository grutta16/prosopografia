package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Eleccion;
import ar.gob.iighi.service.EleccionService;
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
 * REST controller for managing Eleccion.
 */
@RestController
@RequestMapping("/api")
public class EleccionResource {

    private final Logger log = LoggerFactory.getLogger(EleccionResource.class);

    private static final String ENTITY_NAME = "eleccion";

    private final EleccionService eleccionService;

    public EleccionResource(EleccionService eleccionService) {
        this.eleccionService = eleccionService;
    }

    /**
     * POST  /eleccions : Create a new eleccion.
     *
     * @param eleccion the eleccion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eleccion, or with status 400 (Bad Request) if the eleccion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/eleccions")
    @Timed
    public ResponseEntity<Eleccion> createEleccion(@Valid @RequestBody Eleccion eleccion) throws URISyntaxException {
        log.debug("REST request to save Eleccion : {}", eleccion);
        if (eleccion.getId() != null) {
            throw new BadRequestAlertException("A new eleccion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Eleccion result = eleccionService.save(eleccion);
        return ResponseEntity.created(new URI("/api/eleccions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /eleccions : Updates an existing eleccion.
     *
     * @param eleccion the eleccion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eleccion,
     * or with status 400 (Bad Request) if the eleccion is not valid,
     * or with status 500 (Internal Server Error) if the eleccion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/eleccions")
    @Timed
    public ResponseEntity<Eleccion> updateEleccion(@Valid @RequestBody Eleccion eleccion) throws URISyntaxException {
        log.debug("REST request to update Eleccion : {}", eleccion);
        if (eleccion.getId() == null) {
            return createEleccion(eleccion);
        }
        Eleccion result = eleccionService.save(eleccion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eleccion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /eleccions : get all the eleccions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of eleccions in body
     */
    @GetMapping("/eleccions")
    @Timed
    public ResponseEntity<List<Eleccion>> getAllEleccions(Pageable pageable) {
        log.debug("REST request to get a page of Eleccions");
        Page<Eleccion> page = eleccionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/eleccions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /eleccions/:id : get the "id" eleccion.
     *
     * @param id the id of the eleccion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eleccion, or with status 404 (Not Found)
     */
    @GetMapping("/eleccions/{id}")
    @Timed
    public ResponseEntity<Eleccion> getEleccion(@PathVariable Long id) {
        log.debug("REST request to get Eleccion : {}", id);
        Eleccion eleccion = eleccionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(eleccion));
    }

    /**
     * DELETE  /eleccions/:id : delete the "id" eleccion.
     *
     * @param id the id of the eleccion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/eleccions/{id}")
    @Timed
    public ResponseEntity<Void> deleteEleccion(@PathVariable Long id) {
        log.debug("REST request to delete Eleccion : {}", id);
        eleccionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/eleccions?query=:query : search for the eleccion corresponding
     * to the query.
     *
     * @param query the query of the eleccion search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/eleccions")
    @Timed
    public ResponseEntity<List<Eleccion>> searchEleccions(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Eleccions for query {}", query);
        Page<Eleccion> page = eleccionService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/eleccions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
