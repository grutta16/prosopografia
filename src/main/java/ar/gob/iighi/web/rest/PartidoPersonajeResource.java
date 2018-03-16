package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.PartidoPersonaje;
import ar.gob.iighi.service.PartidoPersonajeService;
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
 * REST controller for managing PartidoPersonaje.
 */
@RestController
@RequestMapping("/api")
public class PartidoPersonajeResource {

    private final Logger log = LoggerFactory.getLogger(PartidoPersonajeResource.class);

    private static final String ENTITY_NAME = "partidoPersonaje";

    private final PartidoPersonajeService partidoPersonajeService;

    public PartidoPersonajeResource(PartidoPersonajeService partidoPersonajeService) {
        this.partidoPersonajeService = partidoPersonajeService;
    }

    /**
     * POST  /partido-personajes : Create a new partidoPersonaje.
     *
     * @param partidoPersonaje the partidoPersonaje to create
     * @return the ResponseEntity with status 201 (Created) and with body the new partidoPersonaje, or with status 400 (Bad Request) if the partidoPersonaje has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/partido-personajes")
    @Timed
    public ResponseEntity<PartidoPersonaje> createPartidoPersonaje(@Valid @RequestBody PartidoPersonaje partidoPersonaje) throws URISyntaxException {
        log.debug("REST request to save PartidoPersonaje : {}", partidoPersonaje);
        if (partidoPersonaje.getId() != null) {
            throw new BadRequestAlertException("A new partidoPersonaje cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PartidoPersonaje result = partidoPersonajeService.save(partidoPersonaje);
        return ResponseEntity.created(new URI("/api/partido-personajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /partido-personajes : Updates an existing partidoPersonaje.
     *
     * @param partidoPersonaje the partidoPersonaje to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated partidoPersonaje,
     * or with status 400 (Bad Request) if the partidoPersonaje is not valid,
     * or with status 500 (Internal Server Error) if the partidoPersonaje couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/partido-personajes")
    @Timed
    public ResponseEntity<PartidoPersonaje> updatePartidoPersonaje(@Valid @RequestBody PartidoPersonaje partidoPersonaje) throws URISyntaxException {
        log.debug("REST request to update PartidoPersonaje : {}", partidoPersonaje);
        if (partidoPersonaje.getId() == null) {
            return createPartidoPersonaje(partidoPersonaje);
        }
        PartidoPersonaje result = partidoPersonajeService.save(partidoPersonaje);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, partidoPersonaje.getId().toString()))
            .body(result);
    }

    /**
     * GET  /partido-personajes : get all the partidoPersonajes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of partidoPersonajes in body
     */
    @GetMapping("/partido-personajes")
    @Timed
    public ResponseEntity<List<PartidoPersonaje>> getAllPartidoPersonajes(Pageable pageable) {
        log.debug("REST request to get a page of PartidoPersonajes");
        Page<PartidoPersonaje> page = partidoPersonajeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/partido-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /partido-personajes/:id : get the "id" partidoPersonaje.
     *
     * @param id the id of the partidoPersonaje to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the partidoPersonaje, or with status 404 (Not Found)
     */
    @GetMapping("/partido-personajes/{id}")
    @Timed
    public ResponseEntity<PartidoPersonaje> getPartidoPersonaje(@PathVariable Long id) {
        log.debug("REST request to get PartidoPersonaje : {}", id);
        PartidoPersonaje partidoPersonaje = partidoPersonajeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(partidoPersonaje));
    }

    /**
     * DELETE  /partido-personajes/:id : delete the "id" partidoPersonaje.
     *
     * @param id the id of the partidoPersonaje to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/partido-personajes/{id}")
    @Timed
    public ResponseEntity<Void> deletePartidoPersonaje(@PathVariable Long id) {
        log.debug("REST request to delete PartidoPersonaje : {}", id);
        partidoPersonajeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/partido-personajes?query=:query : search for the partidoPersonaje corresponding
     * to the query.
     *
     * @param query the query of the partidoPersonaje search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/partido-personajes")
    @Timed
    public ResponseEntity<List<PartidoPersonaje>> searchPartidoPersonajes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of PartidoPersonajes for query {}", query);
        Page<PartidoPersonaje> page = partidoPersonajeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/partido-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
