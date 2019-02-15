package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.ResidenciaPersonaje;
import ar.gob.iighi.service.ResidenciaPersonajeService;
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
 * REST controller for managing ResidenciaPersonaje.
 */
@RestController
@RequestMapping("/api")
public class ResidenciaPersonajeResource {

    private final Logger log = LoggerFactory.getLogger(ResidenciaPersonajeResource.class);

    private static final String ENTITY_NAME = "residenciaPersonaje";

    private final ResidenciaPersonajeService residenciaPersonajeService;

    public ResidenciaPersonajeResource(ResidenciaPersonajeService residenciaPersonajeService) {
        this.residenciaPersonajeService = residenciaPersonajeService;
    }

    /**
     * POST  /residencia-personajes : Create a new residenciaPersonaje.
     *
     * @param residenciaPersonaje the residenciaPersonaje to create
     * @return the ResponseEntity with status 201 (Created) and with body the new residenciaPersonaje, or with status 400 (Bad Request) if the residenciaPersonaje has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/residencia-personajes")
    @Timed
    public ResponseEntity<ResidenciaPersonaje> createResidenciaPersonaje(@Valid @RequestBody ResidenciaPersonaje residenciaPersonaje) throws URISyntaxException {
        log.debug("REST request to save ResidenciaPersonaje : {}", residenciaPersonaje);
        if (residenciaPersonaje.getId() != null) {
            throw new BadRequestAlertException("A new residenciaPersonaje cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ResidenciaPersonaje result = residenciaPersonajeService.save(residenciaPersonaje);
        return ResponseEntity.created(new URI("/api/residencia-personajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /residencia-personajes : Updates an existing residenciaPersonaje.
     *
     * @param residenciaPersonaje the residenciaPersonaje to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated residenciaPersonaje,
     * or with status 400 (Bad Request) if the residenciaPersonaje is not valid,
     * or with status 500 (Internal Server Error) if the residenciaPersonaje couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/residencia-personajes")
    @Timed
    public ResponseEntity<ResidenciaPersonaje> updateResidenciaPersonaje(@Valid @RequestBody ResidenciaPersonaje residenciaPersonaje) throws URISyntaxException {
        log.debug("REST request to update ResidenciaPersonaje : {}", residenciaPersonaje);
        if (residenciaPersonaje.getId() == null) {
            return createResidenciaPersonaje(residenciaPersonaje);
        }
        ResidenciaPersonaje result = residenciaPersonajeService.save(residenciaPersonaje);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, residenciaPersonaje.getId().toString()))
            .body(result);
    }

    /**
     * GET  /residencia-personajes : get all the residenciaPersonajes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of residenciaPersonajes in body
     */
    @GetMapping("/residencia-personajes")
    @Timed
    public ResponseEntity<List<ResidenciaPersonaje>> getAllResidenciaPersonajes(Pageable pageable) {
        log.debug("REST request to get a page of ResidenciaPersonajes");
        Page<ResidenciaPersonaje> page = residenciaPersonajeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/residencia-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /residencia-personajes/:id : get the "id" residenciaPersonaje.
     *
     * @param id the id of the residenciaPersonaje to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the residenciaPersonaje, or with status 404 (Not Found)
     */
    @GetMapping("/residencia-personajes/{id}")
    @Timed
    public ResponseEntity<ResidenciaPersonaje> getResidenciaPersonaje(@PathVariable Long id) {
        log.debug("REST request to get ResidenciaPersonaje : {}", id);
        ResidenciaPersonaje residenciaPersonaje = residenciaPersonajeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(residenciaPersonaje));
    }

    /**
     * DELETE  /residencia-personajes/:id : delete the "id" residenciaPersonaje.
     *
     * @param id the id of the residenciaPersonaje to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/residencia-personajes/{id}")
    @Timed
    public ResponseEntity<Void> deleteResidenciaPersonaje(@PathVariable Long id) {
        log.debug("REST request to delete ResidenciaPersonaje : {}", id);
        residenciaPersonajeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/residencia-personajes?query=:query : search for the residenciaPersonaje corresponding
     * to the query.
     *
     * @param query the query of the residenciaPersonaje search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/residencia-personajes")
    @Timed
    public ResponseEntity<List<ResidenciaPersonaje>> searchResidenciaPersonajes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of ResidenciaPersonajes for query {}", query);
        Page<ResidenciaPersonaje> page = residenciaPersonajeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/residencia-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
