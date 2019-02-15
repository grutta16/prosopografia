package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.AsociacionPersonaje;
import ar.gob.iighi.service.AsociacionPersonajeService;
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
 * REST controller for managing AsociacionPersonaje.
 */
@RestController
@RequestMapping("/api")
public class AsociacionPersonajeResource {

    private final Logger log = LoggerFactory.getLogger(AsociacionPersonajeResource.class);

    private static final String ENTITY_NAME = "asociacionPersonaje";

    private final AsociacionPersonajeService asociacionPersonajeService;

    public AsociacionPersonajeResource(AsociacionPersonajeService asociacionPersonajeService) {
        this.asociacionPersonajeService = asociacionPersonajeService;
    }

    /**
     * POST  /asociacion-personajes : Create a new asociacionPersonaje.
     *
     * @param asociacionPersonaje the asociacionPersonaje to create
     * @return the ResponseEntity with status 201 (Created) and with body the new asociacionPersonaje, or with status 400 (Bad Request) if the asociacionPersonaje has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/asociacion-personajes")
    @Timed
    public ResponseEntity<AsociacionPersonaje> createAsociacionPersonaje(@Valid @RequestBody AsociacionPersonaje asociacionPersonaje) throws URISyntaxException {
        log.debug("REST request to save AsociacionPersonaje : {}", asociacionPersonaje);
        if (asociacionPersonaje.getId() != null) {
            throw new BadRequestAlertException("A new asociacionPersonaje cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AsociacionPersonaje result = asociacionPersonajeService.save(asociacionPersonaje);
        return ResponseEntity.created(new URI("/api/asociacion-personajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /asociacion-personajes : Updates an existing asociacionPersonaje.
     *
     * @param asociacionPersonaje the asociacionPersonaje to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated asociacionPersonaje,
     * or with status 400 (Bad Request) if the asociacionPersonaje is not valid,
     * or with status 500 (Internal Server Error) if the asociacionPersonaje couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/asociacion-personajes")
    @Timed
    public ResponseEntity<AsociacionPersonaje> updateAsociacionPersonaje(@Valid @RequestBody AsociacionPersonaje asociacionPersonaje) throws URISyntaxException {
        log.debug("REST request to update AsociacionPersonaje : {}", asociacionPersonaje);
        if (asociacionPersonaje.getId() == null) {
            return createAsociacionPersonaje(asociacionPersonaje);
        }
        AsociacionPersonaje result = asociacionPersonajeService.save(asociacionPersonaje);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, asociacionPersonaje.getId().toString()))
            .body(result);
    }

    /**
     * GET  /asociacion-personajes : get all the asociacionPersonajes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of asociacionPersonajes in body
     */
    @GetMapping("/asociacion-personajes")
    @Timed
    public ResponseEntity<List<AsociacionPersonaje>> getAllAsociacionPersonajes(Pageable pageable) {
        log.debug("REST request to get a page of AsociacionPersonajes");
        Page<AsociacionPersonaje> page = asociacionPersonajeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/asociacion-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /asociacion-personajes/:id : get the "id" asociacionPersonaje.
     *
     * @param id the id of the asociacionPersonaje to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the asociacionPersonaje, or with status 404 (Not Found)
     */
    @GetMapping("/asociacion-personajes/{id}")
    @Timed
    public ResponseEntity<AsociacionPersonaje> getAsociacionPersonaje(@PathVariable Long id) {
        log.debug("REST request to get AsociacionPersonaje : {}", id);
        AsociacionPersonaje asociacionPersonaje = asociacionPersonajeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(asociacionPersonaje));
    }

    /**
     * DELETE  /asociacion-personajes/:id : delete the "id" asociacionPersonaje.
     *
     * @param id the id of the asociacionPersonaje to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/asociacion-personajes/{id}")
    @Timed
    public ResponseEntity<Void> deleteAsociacionPersonaje(@PathVariable Long id) {
        log.debug("REST request to delete AsociacionPersonaje : {}", id);
        asociacionPersonajeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/asociacion-personajes?query=:query : search for the asociacionPersonaje corresponding
     * to the query.
     *
     * @param query the query of the asociacionPersonaje search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/asociacion-personajes")
    @Timed
    public ResponseEntity<List<AsociacionPersonaje>> searchAsociacionPersonajes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of AsociacionPersonajes for query {}", query);
        Page<AsociacionPersonaje> page = asociacionPersonajeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/asociacion-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
