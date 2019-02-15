package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.FamiliarPersonaje;
import ar.gob.iighi.service.FamiliarPersonajeService;
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
 * REST controller for managing FamiliarPersonaje.
 */
@RestController
@RequestMapping("/api")
public class FamiliarPersonajeResource {

    private final Logger log = LoggerFactory.getLogger(FamiliarPersonajeResource.class);

    private static final String ENTITY_NAME = "familiarPersonaje";

    private final FamiliarPersonajeService familiarPersonajeService;

    public FamiliarPersonajeResource(FamiliarPersonajeService familiarPersonajeService) {
        this.familiarPersonajeService = familiarPersonajeService;
    }

    /**
     * POST  /familiar-personajes : Create a new familiarPersonaje.
     *
     * @param familiarPersonaje the familiarPersonaje to create
     * @return the ResponseEntity with status 201 (Created) and with body the new familiarPersonaje, or with status 400 (Bad Request) if the familiarPersonaje has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/familiar-personajes")
    @Timed
    public ResponseEntity<FamiliarPersonaje> createFamiliarPersonaje(@Valid @RequestBody FamiliarPersonaje familiarPersonaje) throws URISyntaxException {
        log.debug("REST request to save FamiliarPersonaje : {}", familiarPersonaje);
        if (familiarPersonaje.getId() != null) {
            throw new BadRequestAlertException("A new familiarPersonaje cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FamiliarPersonaje result = familiarPersonajeService.save(familiarPersonaje);
        return ResponseEntity.created(new URI("/api/familiar-personajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /familiar-personajes : Updates an existing familiarPersonaje.
     *
     * @param familiarPersonaje the familiarPersonaje to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated familiarPersonaje,
     * or with status 400 (Bad Request) if the familiarPersonaje is not valid,
     * or with status 500 (Internal Server Error) if the familiarPersonaje couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/familiar-personajes")
    @Timed
    public ResponseEntity<FamiliarPersonaje> updateFamiliarPersonaje(@Valid @RequestBody FamiliarPersonaje familiarPersonaje) throws URISyntaxException {
        log.debug("REST request to update FamiliarPersonaje : {}", familiarPersonaje);
        if (familiarPersonaje.getId() == null) {
            return createFamiliarPersonaje(familiarPersonaje);
        }
        FamiliarPersonaje result = familiarPersonajeService.save(familiarPersonaje);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, familiarPersonaje.getId().toString()))
            .body(result);
    }

    /**
     * GET  /familiar-personajes : get all the familiarPersonajes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of familiarPersonajes in body
     */
    @GetMapping("/familiar-personajes")
    @Timed
    public ResponseEntity<List<FamiliarPersonaje>> getAllFamiliarPersonajes(Pageable pageable) {
        log.debug("REST request to get a page of FamiliarPersonajes");
        Page<FamiliarPersonaje> page = familiarPersonajeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/familiar-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /familiar-personajes/:id : get the "id" familiarPersonaje.
     *
     * @param id the id of the familiarPersonaje to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the familiarPersonaje, or with status 404 (Not Found)
     */
    @GetMapping("/familiar-personajes/{id}")
    @Timed
    public ResponseEntity<FamiliarPersonaje> getFamiliarPersonaje(@PathVariable Long id) {
        log.debug("REST request to get FamiliarPersonaje : {}", id);
        FamiliarPersonaje familiarPersonaje = familiarPersonajeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(familiarPersonaje));
    }

    /**
     * DELETE  /familiar-personajes/:id : delete the "id" familiarPersonaje.
     *
     * @param id the id of the familiarPersonaje to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/familiar-personajes/{id}")
    @Timed
    public ResponseEntity<Void> deleteFamiliarPersonaje(@PathVariable Long id) {
        log.debug("REST request to delete FamiliarPersonaje : {}", id);
        familiarPersonajeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/familiar-personajes?query=:query : search for the familiarPersonaje corresponding
     * to the query.
     *
     * @param query the query of the familiarPersonaje search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/familiar-personajes")
    @Timed
    public ResponseEntity<List<FamiliarPersonaje>> searchFamiliarPersonajes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of FamiliarPersonajes for query {}", query);
        Page<FamiliarPersonaje> page = familiarPersonajeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/familiar-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
