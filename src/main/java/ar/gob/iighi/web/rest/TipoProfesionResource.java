package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.TipoProfesion;
import ar.gob.iighi.service.TipoProfesionService;
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
 * REST controller for managing TipoProfesion.
 */
@RestController
@RequestMapping("/api")
public class TipoProfesionResource {

    private final Logger log = LoggerFactory.getLogger(TipoProfesionResource.class);

    private static final String ENTITY_NAME = "tipoProfesion";

    private final TipoProfesionService tipoProfesionService;

    public TipoProfesionResource(TipoProfesionService tipoProfesionService) {
        this.tipoProfesionService = tipoProfesionService;
    }

    /**
     * POST  /tipo-profesions : Create a new tipoProfesion.
     *
     * @param tipoProfesion the tipoProfesion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoProfesion, or with status 400 (Bad Request) if the tipoProfesion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-profesions")
    @Timed
    public ResponseEntity<TipoProfesion> createTipoProfesion(@Valid @RequestBody TipoProfesion tipoProfesion) throws URISyntaxException {
        log.debug("REST request to save TipoProfesion : {}", tipoProfesion);
        if (tipoProfesion.getId() != null) {
            throw new BadRequestAlertException("A new tipoProfesion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoProfesion result = tipoProfesionService.save(tipoProfesion);
        return ResponseEntity.created(new URI("/api/tipo-profesions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-profesions : Updates an existing tipoProfesion.
     *
     * @param tipoProfesion the tipoProfesion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoProfesion,
     * or with status 400 (Bad Request) if the tipoProfesion is not valid,
     * or with status 500 (Internal Server Error) if the tipoProfesion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-profesions")
    @Timed
    public ResponseEntity<TipoProfesion> updateTipoProfesion(@Valid @RequestBody TipoProfesion tipoProfesion) throws URISyntaxException {
        log.debug("REST request to update TipoProfesion : {}", tipoProfesion);
        if (tipoProfesion.getId() == null) {
            return createTipoProfesion(tipoProfesion);
        }
        TipoProfesion result = tipoProfesionService.save(tipoProfesion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoProfesion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-profesions : get all the tipoProfesions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tipoProfesions in body
     */
    @GetMapping("/tipo-profesions")
    @Timed
    public ResponseEntity<List<TipoProfesion>> getAllTipoProfesions(Pageable pageable) {
        log.debug("REST request to get a page of TipoProfesions");
        Page<TipoProfesion> page = tipoProfesionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tipo-profesions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tipo-profesions/:id : get the "id" tipoProfesion.
     *
     * @param id the id of the tipoProfesion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoProfesion, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-profesions/{id}")
    @Timed
    public ResponseEntity<TipoProfesion> getTipoProfesion(@PathVariable Long id) {
        log.debug("REST request to get TipoProfesion : {}", id);
        TipoProfesion tipoProfesion = tipoProfesionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoProfesion));
    }

    /**
     * DELETE  /tipo-profesions/:id : delete the "id" tipoProfesion.
     *
     * @param id the id of the tipoProfesion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-profesions/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoProfesion(@PathVariable Long id) {
        log.debug("REST request to delete TipoProfesion : {}", id);
        tipoProfesionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tipo-profesions?query=:query : search for the tipoProfesion corresponding
     * to the query.
     *
     * @param query the query of the tipoProfesion search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/tipo-profesions")
    @Timed
    public ResponseEntity<List<TipoProfesion>> searchTipoProfesions(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TipoProfesions for query {}", query);
        Page<TipoProfesion> page = tipoProfesionService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/tipo-profesions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
