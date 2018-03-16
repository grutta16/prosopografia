package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Profesion;
import ar.gob.iighi.service.ProfesionService;
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
 * REST controller for managing Profesion.
 */
@RestController
@RequestMapping("/api")
public class ProfesionResource {

    private final Logger log = LoggerFactory.getLogger(ProfesionResource.class);

    private static final String ENTITY_NAME = "profesion";

    private final ProfesionService profesionService;

    public ProfesionResource(ProfesionService profesionService) {
        this.profesionService = profesionService;
    }

    /**
     * POST  /profesions : Create a new profesion.
     *
     * @param profesion the profesion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new profesion, or with status 400 (Bad Request) if the profesion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/profesions")
    @Timed
    public ResponseEntity<Profesion> createProfesion(@Valid @RequestBody Profesion profesion) throws URISyntaxException {
        log.debug("REST request to save Profesion : {}", profesion);
        if (profesion.getId() != null) {
            throw new BadRequestAlertException("A new profesion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Profesion result = profesionService.save(profesion);
        return ResponseEntity.created(new URI("/api/profesions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /profesions : Updates an existing profesion.
     *
     * @param profesion the profesion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated profesion,
     * or with status 400 (Bad Request) if the profesion is not valid,
     * or with status 500 (Internal Server Error) if the profesion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/profesions")
    @Timed
    public ResponseEntity<Profesion> updateProfesion(@Valid @RequestBody Profesion profesion) throws URISyntaxException {
        log.debug("REST request to update Profesion : {}", profesion);
        if (profesion.getId() == null) {
            return createProfesion(profesion);
        }
        Profesion result = profesionService.save(profesion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, profesion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /profesions : get all the profesions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of profesions in body
     */
    @GetMapping("/profesions")
    @Timed
    public ResponseEntity<List<Profesion>> getAllProfesions(Pageable pageable) {
        log.debug("REST request to get a page of Profesions");
        Page<Profesion> page = profesionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/profesions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /profesions/:id : get the "id" profesion.
     *
     * @param id the id of the profesion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the profesion, or with status 404 (Not Found)
     */
    @GetMapping("/profesions/{id}")
    @Timed
    public ResponseEntity<Profesion> getProfesion(@PathVariable Long id) {
        log.debug("REST request to get Profesion : {}", id);
        Profesion profesion = profesionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(profesion));
    }

    /**
     * DELETE  /profesions/:id : delete the "id" profesion.
     *
     * @param id the id of the profesion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/profesions/{id}")
    @Timed
    public ResponseEntity<Void> deleteProfesion(@PathVariable Long id) {
        log.debug("REST request to delete Profesion : {}", id);
        profesionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/profesions?query=:query : search for the profesion corresponding
     * to the query.
     *
     * @param query the query of the profesion search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/profesions")
    @Timed
    public ResponseEntity<List<Profesion>> searchProfesions(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Profesions for query {}", query);
        Page<Profesion> page = profesionService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/profesions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
