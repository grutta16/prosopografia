package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.ParejaPersonaje;
import ar.gob.iighi.service.ParejaPersonajeService;
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
 * REST controller for managing ParejaPersonaje.
 */
@RestController
@RequestMapping("/api")
public class ParejaPersonajeResource {

    private final Logger log = LoggerFactory.getLogger(ParejaPersonajeResource.class);

    private static final String ENTITY_NAME = "parejaPersonaje";

    private final ParejaPersonajeService parejaPersonajeService;

    public ParejaPersonajeResource(ParejaPersonajeService parejaPersonajeService) {
        this.parejaPersonajeService = parejaPersonajeService;
    }

    /**
     * POST  /pareja-personajes : Create a new parejaPersonaje.
     *
     * @param parejaPersonaje the parejaPersonaje to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parejaPersonaje, or with status 400 (Bad Request) if the parejaPersonaje has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pareja-personajes")
    @Timed
    public ResponseEntity<ParejaPersonaje> createParejaPersonaje(@Valid @RequestBody ParejaPersonaje parejaPersonaje) throws URISyntaxException {
        log.debug("REST request to save ParejaPersonaje : {}", parejaPersonaje);
        if (parejaPersonaje.getId() != null) {
            throw new BadRequestAlertException("A new parejaPersonaje cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParejaPersonaje result = parejaPersonajeService.save(parejaPersonaje);
        return ResponseEntity.created(new URI("/api/pareja-personajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pareja-personajes : Updates an existing parejaPersonaje.
     *
     * @param parejaPersonaje the parejaPersonaje to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parejaPersonaje,
     * or with status 400 (Bad Request) if the parejaPersonaje is not valid,
     * or with status 500 (Internal Server Error) if the parejaPersonaje couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pareja-personajes")
    @Timed
    public ResponseEntity<ParejaPersonaje> updateParejaPersonaje(@Valid @RequestBody ParejaPersonaje parejaPersonaje) throws URISyntaxException {
        log.debug("REST request to update ParejaPersonaje : {}", parejaPersonaje);
        if (parejaPersonaje.getId() == null) {
            return createParejaPersonaje(parejaPersonaje);
        }
        ParejaPersonaje result = parejaPersonajeService.save(parejaPersonaje);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parejaPersonaje.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pareja-personajes : get all the parejaPersonajes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of parejaPersonajes in body
     */
    @GetMapping("/pareja-personajes")
    @Timed
    public ResponseEntity<List<ParejaPersonaje>> getAllParejaPersonajes(Pageable pageable) {
        log.debug("REST request to get a page of ParejaPersonajes");
        Page<ParejaPersonaje> page = parejaPersonajeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pareja-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pareja-personajes/:id : get the "id" parejaPersonaje.
     *
     * @param id the id of the parejaPersonaje to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parejaPersonaje, or with status 404 (Not Found)
     */
    @GetMapping("/pareja-personajes/{id}")
    @Timed
    public ResponseEntity<ParejaPersonaje> getParejaPersonaje(@PathVariable Long id) {
        log.debug("REST request to get ParejaPersonaje : {}", id);
        ParejaPersonaje parejaPersonaje = parejaPersonajeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(parejaPersonaje));
    }

    /**
     * DELETE  /pareja-personajes/:id : delete the "id" parejaPersonaje.
     *
     * @param id the id of the parejaPersonaje to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pareja-personajes/{id}")
    @Timed
    public ResponseEntity<Void> deleteParejaPersonaje(@PathVariable Long id) {
        log.debug("REST request to delete ParejaPersonaje : {}", id);
        parejaPersonajeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/pareja-personajes?query=:query : search for the parejaPersonaje corresponding
     * to the query.
     *
     * @param query the query of the parejaPersonaje search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/pareja-personajes")
    @Timed
    public ResponseEntity<List<ParejaPersonaje>> searchParejaPersonajes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of ParejaPersonajes for query {}", query);
        Page<ParejaPersonaje> page = parejaPersonajeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/pareja-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
