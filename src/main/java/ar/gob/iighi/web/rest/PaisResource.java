package ar.gob.iighi.web.rest;

import ar.gob.iighi.domain.Provincia;
import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.Pais;
import ar.gob.iighi.service.PaisService;
import ar.gob.iighi.web.rest.errors.BadRequestAlertException;
import ar.gob.iighi.web.rest.util.HeaderUtil;
import ar.gob.iighi.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Pais.
 */
@RestController
@RequestMapping("/api")
public class PaisResource {

    private final Logger log = LoggerFactory.getLogger(PaisResource.class);

    private static final String ENTITY_NAME = "pais";

    private final PaisService paisService;

    public PaisResource(PaisService paisService) {
        this.paisService = paisService;
    }

    /**
     * POST  /pais : Create a new pais.
     *
     * @param pais the pais to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pais, or with status 400 (Bad Request) if the pais has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pais")
    @Timed
    public ResponseEntity<Pais> createPais(@Valid @RequestBody Pais pais) throws URISyntaxException {
        log.debug("REST request to save Pais : {}", pais);
        if (pais.getId() != null) {
            throw new BadRequestAlertException("A new pais cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (paisService.existe(pais)) {
            throw new BadRequestAlertException("Duplicado: un registro de país con esos datos ya existe", ENTITY_NAME, "duplicated");
        }
        Pais result = paisService.save(pais);
        return ResponseEntity.created(new URI("/api/pais/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pais : Updates an existing pais.
     *
     * @param pais the pais to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pais,
     * or with status 400 (Bad Request) if the pais is not valid,
     * or with status 500 (Internal Server Error) if the pais couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pais")
    @Timed
    public ResponseEntity<Pais> updatePais(@Valid @RequestBody Pais pais) throws URISyntaxException {
        log.debug("REST request to update Pais : {}", pais);
        if (pais.getId() == null) {
            return createPais(pais);
        }
        if (paisService.existe(pais)) {
            throw new BadRequestAlertException("Duplicado: un registro de país con esos datos ya existe", ENTITY_NAME, "duplicated");
        }
        Pais result = paisService.save(pais);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pais.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pais : get all the pais.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pais in body
     */
    @GetMapping("/pais")
    @Timed
    public ResponseEntity<List<Pais>> getAllPais(Pageable pageable) {
        log.debug("REST request to get a page of Pais");
        Page<Pais> page = paisService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pais");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pais/:id : get the "id" pais.
     *
     * @param id the id of the pais to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pais, or with status 404 (Not Found)
     */
    @GetMapping("/pais/{id}")
    @Timed
    public ResponseEntity<Pais> getPais(@PathVariable Long id) {
        log.debug("REST request to get Pais : {}", id);
        Pais pais = paisService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pais));
    }

    /**
     * DELETE  /pais/:id : delete the "id" pais.
     *
     * @param id the id of the pais to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pais/{id}")
    @Timed
    public ResponseEntity<Void> deletePais(@PathVariable Long id) {
        log.debug("REST request to delete Pais : {}", id);
        paisService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/pais?query=:query : search for the pais corresponding
     * to the query.
     *
     * @param query the query of the pais search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/pais")
    @Timed
    public ResponseEntity<List<Pais>> searchPais(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Pais for query {}", query);
//        Page<Pais> page = paisService.search(query, pageable);
        Page<Pais> page = paisService.search(query + "*", pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/pais");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pais/:id : get the provincias of the "id" pais.
     *
     * @param id the id of the provincias of the pais to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pais, or with status 404 (Not Found)
     */
    @GetMapping("/pais/provincias/{id}")
    @Timed
    public ResponseEntity<List<Provincia>> getProvincias(@PathVariable Long id) {
        log.debug("REST request to get Provincias of the Pais : {}", id);

        List<Provincia> list = new ArrayList<>();
        for (Provincia provincia : paisService.findOne(id).getProvincias()){
            list.add(provincia);
        }

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
