package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.EstudioPersonaje;
import ar.gob.iighi.service.EstudioPersonajeService;
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
 * REST controller for managing EstudioPersonaje.
 */
@RestController
@RequestMapping("/api")
public class EstudioPersonajeResource {

    private final Logger log = LoggerFactory.getLogger(EstudioPersonajeResource.class);

    private static final String ENTITY_NAME = "estudioPersonaje";

    private final EstudioPersonajeService estudioPersonajeService;

    public EstudioPersonajeResource(EstudioPersonajeService estudioPersonajeService) {
        this.estudioPersonajeService = estudioPersonajeService;
    }

    /**
     * POST  /estudio-personajes : Create a new estudioPersonaje.
     *
     * @param estudioPersonaje the estudioPersonaje to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estudioPersonaje, or with status 400 (Bad Request) if the estudioPersonaje has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estudio-personajes")
    @Timed
    public ResponseEntity<EstudioPersonaje> createEstudioPersonaje(@Valid @RequestBody EstudioPersonaje estudioPersonaje) throws URISyntaxException {
        log.debug("REST request to save EstudioPersonaje : {}", estudioPersonaje);
        if (estudioPersonaje.getId() != null) {
            throw new BadRequestAlertException("A new estudioPersonaje cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstudioPersonaje result = estudioPersonajeService.save(estudioPersonaje);
        return ResponseEntity.created(new URI("/api/estudio-personajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estudio-personajes : Updates an existing estudioPersonaje.
     *
     * @param estudioPersonaje the estudioPersonaje to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estudioPersonaje,
     * or with status 400 (Bad Request) if the estudioPersonaje is not valid,
     * or with status 500 (Internal Server Error) if the estudioPersonaje couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estudio-personajes")
    @Timed
    public ResponseEntity<EstudioPersonaje> updateEstudioPersonaje(@Valid @RequestBody EstudioPersonaje estudioPersonaje) throws URISyntaxException {
        log.debug("REST request to update EstudioPersonaje : {}", estudioPersonaje);
        if (estudioPersonaje.getId() == null) {
            return createEstudioPersonaje(estudioPersonaje);
        }
        EstudioPersonaje result = estudioPersonajeService.save(estudioPersonaje);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estudioPersonaje.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estudio-personajes : get all the estudioPersonajes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of estudioPersonajes in body
     */
    @GetMapping("/estudio-personajes")
    @Timed
    public ResponseEntity<List<EstudioPersonaje>> getAllEstudioPersonajes(Pageable pageable) {
        log.debug("REST request to get a page of EstudioPersonajes");
        Page<EstudioPersonaje> page = estudioPersonajeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/estudio-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /estudio-personajes/:id : get the "id" estudioPersonaje.
     *
     * @param id the id of the estudioPersonaje to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estudioPersonaje, or with status 404 (Not Found)
     */
    @GetMapping("/estudio-personajes/{id}")
    @Timed
    public ResponseEntity<EstudioPersonaje> getEstudioPersonaje(@PathVariable Long id) {
        log.debug("REST request to get EstudioPersonaje : {}", id);
        EstudioPersonaje estudioPersonaje = estudioPersonajeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(estudioPersonaje));
    }

    /**
     * DELETE  /estudio-personajes/:id : delete the "id" estudioPersonaje.
     *
     * @param id the id of the estudioPersonaje to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estudio-personajes/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstudioPersonaje(@PathVariable Long id) {
        log.debug("REST request to delete EstudioPersonaje : {}", id);
        estudioPersonajeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/estudio-personajes?query=:query : search for the estudioPersonaje corresponding
     * to the query.
     *
     * @param query the query of the estudioPersonaje search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/estudio-personajes")
    @Timed
    public ResponseEntity<List<EstudioPersonaje>> searchEstudioPersonajes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of EstudioPersonajes for query {}", query);
        Page<EstudioPersonaje> page = estudioPersonajeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/estudio-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
