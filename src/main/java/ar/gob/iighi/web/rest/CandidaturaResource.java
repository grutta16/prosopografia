package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Candidatura;
import ar.gob.iighi.service.CandidaturaService;
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
 * REST controller for managing Candidatura.
 */
@RestController
@RequestMapping("/api")
public class CandidaturaResource {

    private final Logger log = LoggerFactory.getLogger(CandidaturaResource.class);

    private static final String ENTITY_NAME = "candidatura";

    private final CandidaturaService candidaturaService;

    public CandidaturaResource(CandidaturaService candidaturaService) {
        this.candidaturaService = candidaturaService;
    }

    /**
     * POST  /candidaturas : Create a new candidatura.
     *
     * @param candidatura the candidatura to create
     * @return the ResponseEntity with status 201 (Created) and with body the new candidatura, or with status 400 (Bad Request) if the candidatura has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/candidaturas")
    @Timed
    public ResponseEntity<Candidatura> createCandidatura(@Valid @RequestBody Candidatura candidatura) throws URISyntaxException {
        log.debug("REST request to save Candidatura : {}", candidatura);
        if (candidatura.getId() != null) {
            throw new BadRequestAlertException("A new candidatura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Candidatura result = candidaturaService.save(candidatura);
        return ResponseEntity.created(new URI("/api/candidaturas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /candidaturas : Updates an existing candidatura.
     *
     * @param candidatura the candidatura to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated candidatura,
     * or with status 400 (Bad Request) if the candidatura is not valid,
     * or with status 500 (Internal Server Error) if the candidatura couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/candidaturas")
    @Timed
    public ResponseEntity<Candidatura> updateCandidatura(@Valid @RequestBody Candidatura candidatura) throws URISyntaxException {
        log.debug("REST request to update Candidatura : {}", candidatura);
        if (candidatura.getId() == null) {
            return createCandidatura(candidatura);
        }
        Candidatura result = candidaturaService.save(candidatura);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, candidatura.getId().toString()))
            .body(result);
    }

    /**
     * GET  /candidaturas : get all the candidaturas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of candidaturas in body
     */
    @GetMapping("/candidaturas")
    @Timed
    public ResponseEntity<List<Candidatura>> getAllCandidaturas(Pageable pageable) {
        log.debug("REST request to get a page of Candidaturas");
        Page<Candidatura> page = candidaturaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/candidaturas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /candidaturas/:id : get the "id" candidatura.
     *
     * @param id the id of the candidatura to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the candidatura, or with status 404 (Not Found)
     */
    @GetMapping("/candidaturas/{id}")
    @Timed
    public ResponseEntity<Candidatura> getCandidatura(@PathVariable Long id) {
        log.debug("REST request to get Candidatura : {}", id);
        Candidatura candidatura = candidaturaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(candidatura));
    }

    /**
     * DELETE  /candidaturas/:id : delete the "id" candidatura.
     *
     * @param id the id of the candidatura to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/candidaturas/{id}")
    @Timed
    public ResponseEntity<Void> deleteCandidatura(@PathVariable Long id) {
        log.debug("REST request to delete Candidatura : {}", id);
        candidaturaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/candidaturas?query=:query : search for the candidatura corresponding
     * to the query.
     *
     * @param query the query of the candidatura search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/candidaturas")
    @Timed
    public ResponseEntity<List<Candidatura>> searchCandidaturas(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Candidaturas for query {}", query);
        Page<Candidatura> page = candidaturaService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/candidaturas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
