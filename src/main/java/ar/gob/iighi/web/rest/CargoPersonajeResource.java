package ar.gob.iighi.web.rest;

import com.codahale.metrics.annotation.Timed;
import ar.gob.iighi.domain.CargoPersonaje;
import ar.gob.iighi.service.CargoPersonajeService;
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
 * REST controller for managing CargoPersonaje.
 */
@RestController
@RequestMapping("/api")
public class CargoPersonajeResource {

    private final Logger log = LoggerFactory.getLogger(CargoPersonajeResource.class);

    private static final String ENTITY_NAME = "cargoPersonaje";

    private final CargoPersonajeService cargoPersonajeService;

    public CargoPersonajeResource(CargoPersonajeService cargoPersonajeService) {
        this.cargoPersonajeService = cargoPersonajeService;
    }

    /**
     * POST  /cargo-personajes : Create a new cargoPersonaje.
     *
     * @param cargoPersonaje the cargoPersonaje to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cargoPersonaje, or with status 400 (Bad Request) if the cargoPersonaje has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cargo-personajes")
    @Timed
    public ResponseEntity<CargoPersonaje> createCargoPersonaje(@Valid @RequestBody CargoPersonaje cargoPersonaje) throws URISyntaxException {
        log.debug("REST request to save CargoPersonaje : {}", cargoPersonaje);
        if (cargoPersonaje.getId() != null) {
            throw new BadRequestAlertException("A new cargoPersonaje cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CargoPersonaje result = cargoPersonajeService.save(cargoPersonaje);
        return ResponseEntity.created(new URI("/api/cargo-personajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cargo-personajes : Updates an existing cargoPersonaje.
     *
     * @param cargoPersonaje the cargoPersonaje to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cargoPersonaje,
     * or with status 400 (Bad Request) if the cargoPersonaje is not valid,
     * or with status 500 (Internal Server Error) if the cargoPersonaje couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cargo-personajes")
    @Timed
    public ResponseEntity<CargoPersonaje> updateCargoPersonaje(@Valid @RequestBody CargoPersonaje cargoPersonaje) throws URISyntaxException {
        log.debug("REST request to update CargoPersonaje : {}", cargoPersonaje);
        if (cargoPersonaje.getId() == null) {
            return createCargoPersonaje(cargoPersonaje);
        }
        CargoPersonaje result = cargoPersonajeService.save(cargoPersonaje);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cargoPersonaje.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cargo-personajes : get all the cargoPersonajes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cargoPersonajes in body
     */
    @GetMapping("/cargo-personajes")
    @Timed
    public ResponseEntity<List<CargoPersonaje>> getAllCargoPersonajes(Pageable pageable) {
        log.debug("REST request to get a page of CargoPersonajes");
        Page<CargoPersonaje> page = cargoPersonajeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cargo-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cargo-personajes/:id : get the "id" cargoPersonaje.
     *
     * @param id the id of the cargoPersonaje to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cargoPersonaje, or with status 404 (Not Found)
     */
    @GetMapping("/cargo-personajes/{id}")
    @Timed
    public ResponseEntity<CargoPersonaje> getCargoPersonaje(@PathVariable Long id) {
        log.debug("REST request to get CargoPersonaje : {}", id);
        CargoPersonaje cargoPersonaje = cargoPersonajeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cargoPersonaje));
    }

    /**
     * DELETE  /cargo-personajes/:id : delete the "id" cargoPersonaje.
     *
     * @param id the id of the cargoPersonaje to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cargo-personajes/{id}")
    @Timed
    public ResponseEntity<Void> deleteCargoPersonaje(@PathVariable Long id) {
        log.debug("REST request to delete CargoPersonaje : {}", id);
        cargoPersonajeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/cargo-personajes?query=:query : search for the cargoPersonaje corresponding
     * to the query.
     *
     * @param query the query of the cargoPersonaje search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/cargo-personajes")
    @Timed
    public ResponseEntity<List<CargoPersonaje>> searchCargoPersonajes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of CargoPersonajes for query {}", query);
        Page<CargoPersonaje> page = cargoPersonajeService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/cargo-personajes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
