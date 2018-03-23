package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.service.PersonajeService;
import ar.gob.iighi.web.rest.errors.BadRequestAlertException;
import ar.gob.iighi.web.rest.util.HeaderUtil;
import ar.gob.iighi.web.rest.util.PaginationUtil;
import ar.gob.iighi.service.dto.PersonajeCriteria;
import ar.gob.iighi.service.PersonajeQueryService;
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
 * REST controller for managing Personaje.
 */
@RestController
@RequestMapping("/api")
public class PersonajeResource {

    private final Logger log = LoggerFactory.getLogger(PersonajeResource.class);

    private static final String ENTITY_NAME = "personaje";

    private final PersonajeService personajeService;

    private final PersonajeQueryService personajeQueryService;

    public PersonajeResource(PersonajeService personajeService, PersonajeQueryService personajeQueryService) {
        this.personajeService = personajeService;
        this.personajeQueryService = personajeQueryService;
    }

    /**
     * POST  /personajes : Create a new personaje.
     *
     * @param personaje the personaje to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personaje, or with status 400 (Bad Request) if the personaje has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/personajes")
    @Timed
    public ResponseEntity<Personaje> createPersonaje(@Valid @RequestBody Personaje personaje) throws URISyntaxException {
        log.debug("REST request to save Personaje : {}", personaje);
        if (personaje.getId() != null) {
            throw new BadRequestAlertException("A new personaje cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Personaje result = personajeService.save(personaje);
        return ResponseEntity.created(new URI("/api/personajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /personajes : Updates an existing personaje.
     *
     * @param personaje the personaje to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated personaje,
     * or with status 400 (Bad Request) if the personaje is not valid,
     * or with status 500 (Internal Server Error) if the personaje couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/personajes")
    @Timed
    public ResponseEntity<Personaje> updatePersonaje(@Valid @RequestBody Personaje personaje) throws URISyntaxException {
        log.debug("REST request to update Personaje : {}", personaje);
        if (personaje.getId() == null) {
            return createPersonaje(personaje);
        }
        Personaje result = personajeService.save(personaje);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personaje.getId().toString()))
            .body(result);
    }

    /**
     * GET  /personajes : get all the personajes.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of personajes in body
     */
    @GetMapping("/personajes")
    @Timed
    public ResponseEntity<List<Personaje>> getAllPersonajes(PersonajeCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Personajes by criteria: {}", criteria);
        Page<Personaje> page = personajeQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /personajes : get all the personajes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of personajes in body
     */
    @GetMapping("/personajes/all")
    @Timed
    public ResponseEntity<List<Personaje>> getQueryAllPersonajes() {
        log.debug("REST request to get all Personajes");
        List<Personaje> list = personajeService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * GET  /personajes/:id : get the "id" personaje.
     *
     * @param id the id of the personaje to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personaje, or with status 404 (Not Found)
     */
    @GetMapping("/personajes/{id}")
    @Timed
    public ResponseEntity<Personaje> getPersonaje(@PathVariable Long id) {
        log.debug("REST request to get Personaje : {}", id);
        Personaje personaje = personajeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(personaje));
    }

    /**
     * DELETE  /personajes/:id : delete the "id" personaje.
     *
     * @param id the id of the personaje to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/personajes/{id}")
    @Timed
    public ResponseEntity<Void> deletePersonaje(@PathVariable Long id) {
        log.debug("REST request to delete Personaje : {}", id);
        personajeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/personajes?query=:query : search for the personaje corresponding
     * to the query.
     *
     * @param query the query of the personaje search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/personajes")
    @Timed
    public ResponseEntity<List<Personaje>> searchPersonajes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Personajes for query {}", query);
        Page<Personaje> page = personajeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
