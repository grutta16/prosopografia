package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Lugar;
import ar.gob.iighi.service.LugarService;
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
 * REST controller for managing Lugar.
 */
@RestController
@RequestMapping("/api")
public class LugarResource {

    private final Logger log = LoggerFactory.getLogger(LugarResource.class);

    private static final String ENTITY_NAME = "lugar";

    private final LugarService lugarService;

    public LugarResource(LugarService lugarService) {
        this.lugarService = lugarService;
    }

    /**
     * POST  /lugars : Create a new lugar.
     *
     * @param lugar the lugar to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lugar, or with status 400 (Bad Request) if the lugar has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lugars")
    @Timed
    public ResponseEntity<Lugar> createLugar(@Valid @RequestBody Lugar lugar) throws URISyntaxException {
        log.debug("REST request to save Lugar : {}", lugar);
        if (lugar.getId() != null) {
            throw new BadRequestAlertException("A new lugar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (lugarService.existe(lugar)) {
            throw new BadRequestAlertException("Duplicado: un registro de lugar con esos datos ya existe", ENTITY_NAME, "duplicated");
        }
        Lugar result = lugarService.save(lugar);
        return ResponseEntity.created(new URI("/api/lugars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lugars : Updates an existing lugar.
     *
     * @param lugar the lugar to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lugar,
     * or with status 400 (Bad Request) if the lugar is not valid,
     * or with status 500 (Internal Server Error) if the lugar couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lugars")
    @Timed
    public ResponseEntity<Lugar> updateLugar(@Valid @RequestBody Lugar lugar) throws URISyntaxException {
        log.debug("REST request to update Lugar : {}", lugar);
        if (lugar.getId() == null) {
            return createLugar(lugar);
        }
        if (lugarService.existe(lugar)) {
            throw new BadRequestAlertException("Duplicado: un registro de lugar con esos datos ya existe", ENTITY_NAME, "duplicated");
        }
        Lugar result = lugarService.save(lugar);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lugar.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lugars : get all the lugars.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lugars in body
     */
    @GetMapping("/lugars")
    @Timed
    public ResponseEntity<List<Lugar>> getAllLugars(Pageable pageable) {
        log.debug("REST request to get a page of Lugars");
        Page<Lugar> page = lugarService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/lugars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /lugars/:id : get the "id" lugar.
     *
     * @param id the id of the lugar to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lugar, or with status 404 (Not Found)
     */
    @GetMapping("/lugars/{id}")
    @Timed
    public ResponseEntity<Lugar> getLugar(@PathVariable Long id) {
        log.debug("REST request to get Lugar : {}", id);
        Lugar lugar = lugarService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lugar));
    }

    /**
     * DELETE  /lugars/:id : delete the "id" lugar.
     *
     * @param id the id of the lugar to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lugars/{id}")
    @Timed
    public ResponseEntity<Void> deleteLugar(@PathVariable Long id) {
        log.debug("REST request to delete Lugar : {}", id);
        lugarService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/lugars?query=:query : search for the lugar corresponding
     * to the query.
     *
     * @param query the query of the lugar search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/lugars")
    @Timed
    public ResponseEntity<List<Lugar>> searchLugars(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Lugars for query {}", query);
//        Page<Lugar> page = lugarService.search(query, pageable);
        Page<Lugar> page = lugarService.search(query + "*", pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/lugars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
