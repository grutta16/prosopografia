package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.RelacionFamiliar;
import ar.gob.iighi.service.RelacionFamiliarService;
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
 * REST controller for managing RelacionFamiliar.
 */
@RestController
@RequestMapping("/api")
public class RelacionFamiliarResource {

    private final Logger log = LoggerFactory.getLogger(RelacionFamiliarResource.class);

    private static final String ENTITY_NAME = "relacionFamiliar";

    private final RelacionFamiliarService relacionFamiliarService;

    public RelacionFamiliarResource(RelacionFamiliarService relacionFamiliarService) {
        this.relacionFamiliarService = relacionFamiliarService;
    }

    /**
     * POST  /relacion-familiars : Create a new relacionFamiliar.
     *
     * @param relacionFamiliar the relacionFamiliar to create
     * @return the ResponseEntity with status 201 (Created) and with body the new relacionFamiliar, or with status 400 (Bad Request) if the relacionFamiliar has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/relacion-familiars")
    @Timed
    public ResponseEntity<RelacionFamiliar> createRelacionFamiliar(@Valid @RequestBody RelacionFamiliar relacionFamiliar) throws URISyntaxException {
        log.debug("REST request to save RelacionFamiliar : {}", relacionFamiliar);
        if (relacionFamiliar.getId() != null) {
            throw new BadRequestAlertException("A new relacionFamiliar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RelacionFamiliar result = relacionFamiliarService.save(relacionFamiliar);
        return ResponseEntity.created(new URI("/api/relacion-familiars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /relacion-familiars : Updates an existing relacionFamiliar.
     *
     * @param relacionFamiliar the relacionFamiliar to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated relacionFamiliar,
     * or with status 400 (Bad Request) if the relacionFamiliar is not valid,
     * or with status 500 (Internal Server Error) if the relacionFamiliar couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/relacion-familiars")
    @Timed
    public ResponseEntity<RelacionFamiliar> updateRelacionFamiliar(@Valid @RequestBody RelacionFamiliar relacionFamiliar) throws URISyntaxException {
        log.debug("REST request to update RelacionFamiliar : {}", relacionFamiliar);
        if (relacionFamiliar.getId() == null) {
            return createRelacionFamiliar(relacionFamiliar);
        }
        RelacionFamiliar result = relacionFamiliarService.save(relacionFamiliar);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, relacionFamiliar.getId().toString()))
            .body(result);
    }

    /**
     * GET  /relacion-familiars : get all the relacionFamiliars.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of relacionFamiliars in body
     */
    @GetMapping("/relacion-familiars")
    @Timed
    public ResponseEntity<List<RelacionFamiliar>> getAllRelacionFamiliars(Pageable pageable) {
        log.debug("REST request to get a page of RelacionFamiliars");
        Page<RelacionFamiliar> page = relacionFamiliarService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/relacion-familiars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /relacion-familiars/:id : get the "id" relacionFamiliar.
     *
     * @param id the id of the relacionFamiliar to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the relacionFamiliar, or with status 404 (Not Found)
     */
    @GetMapping("/relacion-familiars/{id}")
    @Timed
    public ResponseEntity<RelacionFamiliar> getRelacionFamiliar(@PathVariable Long id) {
        log.debug("REST request to get RelacionFamiliar : {}", id);
        RelacionFamiliar relacionFamiliar = relacionFamiliarService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(relacionFamiliar));
    }

    /**
     * DELETE  /relacion-familiars/:id : delete the "id" relacionFamiliar.
     *
     * @param id the id of the relacionFamiliar to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/relacion-familiars/{id}")
    @Timed
    public ResponseEntity<Void> deleteRelacionFamiliar(@PathVariable Long id) {
        log.debug("REST request to delete RelacionFamiliar : {}", id);
        relacionFamiliarService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/relacion-familiars?query=:query : search for the relacionFamiliar corresponding
     * to the query.
     *
     * @param query the query of the relacionFamiliar search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/relacion-familiars")
    @Timed
    public ResponseEntity<List<RelacionFamiliar>> searchRelacionFamiliars(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of RelacionFamiliars for query {}", query);
        Page<RelacionFamiliar> page = relacionFamiliarService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/relacion-familiars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
