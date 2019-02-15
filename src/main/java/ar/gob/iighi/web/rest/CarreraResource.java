package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Carrera;
import ar.gob.iighi.service.CarreraService;
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
 * REST controller for managing Carrera.
 */
@RestController
@RequestMapping("/api")
public class CarreraResource {

    private final Logger log = LoggerFactory.getLogger(CarreraResource.class);

    private static final String ENTITY_NAME = "carrera";

    private final CarreraService carreraService;

    public CarreraResource(CarreraService carreraService) {
        this.carreraService = carreraService;
    }

    /**
     * POST  /carreras : Create a new carrera.
     *
     * @param carrera the carrera to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carrera, or with status 400 (Bad Request) if the carrera has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/carreras")
    @Timed
    public ResponseEntity<Carrera> createCarrera(@Valid @RequestBody Carrera carrera) throws URISyntaxException {
        log.debug("REST request to save Carrera : {}", carrera);
        if (carrera.getId() != null) {
            throw new BadRequestAlertException("A new carrera cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Carrera result = carreraService.save(carrera);
        return ResponseEntity.created(new URI("/api/carreras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /carreras : Updates an existing carrera.
     *
     * @param carrera the carrera to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carrera,
     * or with status 400 (Bad Request) if the carrera is not valid,
     * or with status 500 (Internal Server Error) if the carrera couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/carreras")
    @Timed
    public ResponseEntity<Carrera> updateCarrera(@Valid @RequestBody Carrera carrera) throws URISyntaxException {
        log.debug("REST request to update Carrera : {}", carrera);
        if (carrera.getId() == null) {
            return createCarrera(carrera);
        }
        Carrera result = carreraService.save(carrera);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carrera.getId().toString()))
            .body(result);
    }

    /**
     * GET  /carreras : get all the carreras.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of carreras in body
     */
    @GetMapping("/carreras")
    @Timed
    public ResponseEntity<List<Carrera>> getAllCarreras(Pageable pageable) {
        log.debug("REST request to get a page of Carreras");
        Page<Carrera> page = carreraService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/carreras");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /carreras/:id : get the "id" carrera.
     *
     * @param id the id of the carrera to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carrera, or with status 404 (Not Found)
     */
    @GetMapping("/carreras/{id}")
    @Timed
    public ResponseEntity<Carrera> getCarrera(@PathVariable Long id) {
        log.debug("REST request to get Carrera : {}", id);
        Carrera carrera = carreraService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carrera));
    }

    /**
     * DELETE  /carreras/:id : delete the "id" carrera.
     *
     * @param id the id of the carrera to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/carreras/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarrera(@PathVariable Long id) {
        log.debug("REST request to delete Carrera : {}", id);
        carreraService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/carreras?query=:query : search for the carrera corresponding
     * to the query.
     *
     * @param query the query of the carrera search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/carreras")
    @Timed
    public ResponseEntity<List<Carrera>> searchCarreras(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Carreras for query {}", query);
        Page<Carrera> page = carreraService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/carreras");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
