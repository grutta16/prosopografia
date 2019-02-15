package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.ReligionPersonaje;
import ar.gob.iighi.service.ReligionPersonajeService;
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
 * REST controller for managing ReligionPersonaje.
 */
@RestController
@RequestMapping("/api")
public class ReligionPersonajeResource {

    private final Logger log = LoggerFactory.getLogger(ReligionPersonajeResource.class);

    private static final String ENTITY_NAME = "religionPersonaje";

    private final ReligionPersonajeService religionPersonajeService;

    public ReligionPersonajeResource(ReligionPersonajeService religionPersonajeService) {
        this.religionPersonajeService = religionPersonajeService;
    }

    /**
     * POST  /religion-personajes : Create a new religionPersonaje.
     *
     * @param religionPersonaje the religionPersonaje to create
     * @return the ResponseEntity with status 201 (Created) and with body the new religionPersonaje, or with status 400 (Bad Request) if the religionPersonaje has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/religion-personajes")
    @Timed
    public ResponseEntity<ReligionPersonaje> createReligionPersonaje(@Valid @RequestBody ReligionPersonaje religionPersonaje) throws URISyntaxException {
        log.debug("REST request to save ReligionPersonaje : {}", religionPersonaje);
        if (religionPersonaje.getId() != null) {
            throw new BadRequestAlertException("A new religionPersonaje cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReligionPersonaje result = religionPersonajeService.save(religionPersonaje);
        return ResponseEntity.created(new URI("/api/religion-personajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /religion-personajes : Updates an existing religionPersonaje.
     *
     * @param religionPersonaje the religionPersonaje to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated religionPersonaje,
     * or with status 400 (Bad Request) if the religionPersonaje is not valid,
     * or with status 500 (Internal Server Error) if the religionPersonaje couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/religion-personajes")
    @Timed
    public ResponseEntity<ReligionPersonaje> updateReligionPersonaje(@Valid @RequestBody ReligionPersonaje religionPersonaje) throws URISyntaxException {
        log.debug("REST request to update ReligionPersonaje : {}", religionPersonaje);
        if (religionPersonaje.getId() == null) {
            return createReligionPersonaje(religionPersonaje);
        }
        ReligionPersonaje result = religionPersonajeService.save(religionPersonaje);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, religionPersonaje.getId().toString()))
            .body(result);
    }

    /**
     * GET  /religion-personajes : get all the religionPersonajes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of religionPersonajes in body
     */
    @GetMapping("/religion-personajes")
    @Timed
    public ResponseEntity<List<ReligionPersonaje>> getAllReligionPersonajes(Pageable pageable) {
        log.debug("REST request to get a page of ReligionPersonajes");
        Page<ReligionPersonaje> page = religionPersonajeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/religion-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /religion-personajes/:id : get the "id" religionPersonaje.
     *
     * @param id the id of the religionPersonaje to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the religionPersonaje, or with status 404 (Not Found)
     */
    @GetMapping("/religion-personajes/{id}")
    @Timed
    public ResponseEntity<ReligionPersonaje> getReligionPersonaje(@PathVariable Long id) {
        log.debug("REST request to get ReligionPersonaje : {}", id);
        ReligionPersonaje religionPersonaje = religionPersonajeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(religionPersonaje));
    }

    /**
     * DELETE  /religion-personajes/:id : delete the "id" religionPersonaje.
     *
     * @param id the id of the religionPersonaje to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/religion-personajes/{id}")
    @Timed
    public ResponseEntity<Void> deleteReligionPersonaje(@PathVariable Long id) {
        log.debug("REST request to delete ReligionPersonaje : {}", id);
        religionPersonajeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/religion-personajes?query=:query : search for the religionPersonaje corresponding
     * to the query.
     *
     * @param query the query of the religionPersonaje search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/religion-personajes")
    @Timed
    public ResponseEntity<List<ReligionPersonaje>> searchReligionPersonajes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of ReligionPersonajes for query {}", query);
        Page<ReligionPersonaje> page = religionPersonajeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/religion-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
