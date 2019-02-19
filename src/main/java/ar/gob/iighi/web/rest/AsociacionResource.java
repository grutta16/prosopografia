package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Asociacion;
import ar.gob.iighi.service.AsociacionService;
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
 * REST controller for managing Asociacion.
 */
@RestController
@RequestMapping("/api")
public class AsociacionResource {

    private final Logger log = LoggerFactory.getLogger(AsociacionResource.class);

    private static final String ENTITY_NAME = "asociacion";

    private final AsociacionService asociacionService;

    public AsociacionResource(AsociacionService asociacionService) {
        this.asociacionService = asociacionService;
    }

    /**
     * POST  /asociacions : Create a new asociacion.
     *
     * @param asociacion the asociacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new asociacion, or with status 400 (Bad Request) if the asociacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/asociacions")
    @Timed
    public ResponseEntity<Asociacion> createAsociacion(@Valid @RequestBody Asociacion asociacion) throws URISyntaxException {
        log.debug("REST request to save Asociacion : {}", asociacion);
        if (asociacion.getId() != null) {
            throw new BadRequestAlertException("A new asociacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (asociacionService.existe(asociacion)) {
            throw new BadRequestAlertException("Duplicado: un registro de asociación con esos datos ya existe", ENTITY_NAME, "duplicated");
        }
        Asociacion result = asociacionService.save(asociacion);
        return ResponseEntity.created(new URI("/api/asociacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /asociacions : Updates an existing asociacion.
     *
     * @param asociacion the asociacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated asociacion,
     * or with status 400 (Bad Request) if the asociacion is not valid,
     * or with status 500 (Internal Server Error) if the asociacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/asociacions")
    @Timed
    public ResponseEntity<Asociacion> updateAsociacion(@Valid @RequestBody Asociacion asociacion) throws URISyntaxException {
        log.debug("REST request to update Asociacion : {}", asociacion);
        if (asociacion.getId() == null) {
            return createAsociacion(asociacion);
        }
        if (asociacionService.existe(asociacion)) {
            throw new BadRequestAlertException("Duplicado: un registro de asociación con esos datos ya existe", ENTITY_NAME, "duplicated");
        }
        Asociacion result = asociacionService.save(asociacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, asociacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /asociacions : get all the asociacions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of asociacions in body
     */
    @GetMapping("/asociacions")
    @Timed
    public ResponseEntity<List<Asociacion>> getAllAsociacions(Pageable pageable) {
        log.debug("REST request to get a page of Asociacions");
        Page<Asociacion> page = asociacionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/asociacions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /asociacions/:id : get the "id" asociacion.
     *
     * @param id the id of the asociacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the asociacion, or with status 404 (Not Found)
     */
    @GetMapping("/asociacions/{id}")
    @Timed
    public ResponseEntity<Asociacion> getAsociacion(@PathVariable Long id) {
        log.debug("REST request to get Asociacion : {}", id);
        Asociacion asociacion = asociacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(asociacion));
    }

    /**
     * DELETE  /asociacions/:id : delete the "id" asociacion.
     *
     * @param id the id of the asociacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/asociacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteAsociacion(@PathVariable Long id) {
        log.debug("REST request to delete Asociacion : {}", id);
        asociacionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/asociacions?query=:query : search for the asociacion corresponding
     * to the query.
     *
     * @param query the query of the asociacion search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/asociacions")
    @Timed
    public ResponseEntity<List<Asociacion>> searchAsociacions(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Asociacions for query {}", query);
//        Page<Asociacion> page = asociacionService.search(query, pageable);
        Page<Asociacion> page = asociacionService.search(query + "*", pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/asociacions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
