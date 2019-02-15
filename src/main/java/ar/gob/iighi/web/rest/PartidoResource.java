package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Partido;
import ar.gob.iighi.service.PartidoService;
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
 * REST controller for managing Partido.
 */
@RestController
@RequestMapping("/api")
public class PartidoResource {

    private final Logger log = LoggerFactory.getLogger(PartidoResource.class);

    private static final String ENTITY_NAME = "partido";

    private final PartidoService partidoService;

    public PartidoResource(PartidoService partidoService) {
        this.partidoService = partidoService;
    }

    /**
     * POST  /partidos : Create a new partido.
     *
     * @param partido the partido to create
     * @return the ResponseEntity with status 201 (Created) and with body the new partido, or with status 400 (Bad Request) if the partido has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/partidos")
    @Timed
    public ResponseEntity<Partido> createPartido(@Valid @RequestBody Partido partido) throws URISyntaxException {
        log.debug("REST request to save Partido : {}", partido);
        if (partido.getId() != null) {
            throw new BadRequestAlertException("A new partido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Partido result = partidoService.save(partido);
        return ResponseEntity.created(new URI("/api/partidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /partidos : Updates an existing partido.
     *
     * @param partido the partido to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated partido,
     * or with status 400 (Bad Request) if the partido is not valid,
     * or with status 500 (Internal Server Error) if the partido couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/partidos")
    @Timed
    public ResponseEntity<Partido> updatePartido(@Valid @RequestBody Partido partido) throws URISyntaxException {
        log.debug("REST request to update Partido : {}", partido);
        if (partido.getId() == null) {
            return createPartido(partido);
        }
        Partido result = partidoService.save(partido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, partido.getId().toString()))
            .body(result);
    }

    /**
     * GET  /partidos : get all the partidos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of partidos in body
     */
    @GetMapping("/partidos")
    @Timed
    public ResponseEntity<List<Partido>> getAllPartidos(Pageable pageable) {
        log.debug("REST request to get a page of Partidos");
        Page<Partido> page = partidoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/partidos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /partidos/:id : get the "id" partido.
     *
     * @param id the id of the partido to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the partido, or with status 404 (Not Found)
     */
    @GetMapping("/partidos/{id}")
    @Timed
    public ResponseEntity<Partido> getPartido(@PathVariable Long id) {
        log.debug("REST request to get Partido : {}", id);
        Partido partido = partidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(partido));
    }

    /**
     * DELETE  /partidos/:id : delete the "id" partido.
     *
     * @param id the id of the partido to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/partidos/{id}")
    @Timed
    public ResponseEntity<Void> deletePartido(@PathVariable Long id) {
        log.debug("REST request to delete Partido : {}", id);
        partidoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/partidos?query=:query : search for the partido corresponding
     * to the query.
     *
     * @param query the query of the partido search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/partidos")
    @Timed
    public ResponseEntity<List<Partido>> searchPartidos(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Partidos for query {}", query);
        Page<Partido> page = partidoService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/partidos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
