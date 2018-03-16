package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.DetCandidatura;
import ar.gob.iighi.service.DetCandidaturaService;
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
 * REST controller for managing DetCandidatura.
 */
@RestController
@RequestMapping("/api")
public class DetCandidaturaResource {

    private final Logger log = LoggerFactory.getLogger(DetCandidaturaResource.class);

    private static final String ENTITY_NAME = "detCandidatura";

    private final DetCandidaturaService detCandidaturaService;

    public DetCandidaturaResource(DetCandidaturaService detCandidaturaService) {
        this.detCandidaturaService = detCandidaturaService;
    }

    /**
     * POST  /det-candidaturas : Create a new detCandidatura.
     *
     * @param detCandidatura the detCandidatura to create
     * @return the ResponseEntity with status 201 (Created) and with body the new detCandidatura, or with status 400 (Bad Request) if the detCandidatura has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/det-candidaturas")
    @Timed
    public ResponseEntity<DetCandidatura> createDetCandidatura(@Valid @RequestBody DetCandidatura detCandidatura) throws URISyntaxException {
        log.debug("REST request to save DetCandidatura : {}", detCandidatura);
        if (detCandidatura.getId() != null) {
            throw new BadRequestAlertException("A new detCandidatura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetCandidatura result = detCandidaturaService.save(detCandidatura);
        return ResponseEntity.created(new URI("/api/det-candidaturas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /det-candidaturas : Updates an existing detCandidatura.
     *
     * @param detCandidatura the detCandidatura to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated detCandidatura,
     * or with status 400 (Bad Request) if the detCandidatura is not valid,
     * or with status 500 (Internal Server Error) if the detCandidatura couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/det-candidaturas")
    @Timed
    public ResponseEntity<DetCandidatura> updateDetCandidatura(@Valid @RequestBody DetCandidatura detCandidatura) throws URISyntaxException {
        log.debug("REST request to update DetCandidatura : {}", detCandidatura);
        if (detCandidatura.getId() == null) {
            return createDetCandidatura(detCandidatura);
        }
        DetCandidatura result = detCandidaturaService.save(detCandidatura);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, detCandidatura.getId().toString()))
            .body(result);
    }

    /**
     * GET  /det-candidaturas : get all the detCandidaturas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of detCandidaturas in body
     */
    @GetMapping("/det-candidaturas")
    @Timed
    public ResponseEntity<List<DetCandidatura>> getAllDetCandidaturas(Pageable pageable) {
        log.debug("REST request to get a page of DetCandidaturas");
        Page<DetCandidatura> page = detCandidaturaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/det-candidaturas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /det-candidaturas/:id : get the "id" detCandidatura.
     *
     * @param id the id of the detCandidatura to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the detCandidatura, or with status 404 (Not Found)
     */
    @GetMapping("/det-candidaturas/{id}")
    @Timed
    public ResponseEntity<DetCandidatura> getDetCandidatura(@PathVariable Long id) {
        log.debug("REST request to get DetCandidatura : {}", id);
        DetCandidatura detCandidatura = detCandidaturaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(detCandidatura));
    }

    /**
     * DELETE  /det-candidaturas/:id : delete the "id" detCandidatura.
     *
     * @param id the id of the detCandidatura to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/det-candidaturas/{id}")
    @Timed
    public ResponseEntity<Void> deleteDetCandidatura(@PathVariable Long id) {
        log.debug("REST request to delete DetCandidatura : {}", id);
        detCandidaturaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/det-candidaturas?query=:query : search for the detCandidatura corresponding
     * to the query.
     *
     * @param query the query of the detCandidatura search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/det-candidaturas")
    @Timed
    public ResponseEntity<List<DetCandidatura>> searchDetCandidaturas(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of DetCandidaturas for query {}", query);
        Page<DetCandidatura> page = detCandidaturaService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/det-candidaturas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
