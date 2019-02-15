package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.CargoPersonaje;
import ar.gob.iighi.domain.Cargo;
import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.repository.CargoPersonajeRepository;
import ar.gob.iighi.service.CargoPersonajeService;
import ar.gob.iighi.repository.search.CargoPersonajeSearchRepository;
import ar.gob.iighi.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static ar.gob.iighi.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ar.gob.iighi.domain.enumeration.Alcance;
/**
 * Test class for the CargoPersonajeResource REST controller.
 *
 * @see CargoPersonajeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class CargoPersonajeResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Alcance DEFAULT_ALCANCE = Alcance.INTERNO;
    private static final Alcance UPDATED_ALCANCE = Alcance.DE_GOBIERNO;

    @Autowired
    private CargoPersonajeRepository cargoPersonajeRepository;

    @Autowired
    private CargoPersonajeService cargoPersonajeService;

    @Autowired
    private CargoPersonajeSearchRepository cargoPersonajeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCargoPersonajeMockMvc;

    private CargoPersonaje cargoPersonaje;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CargoPersonajeResource cargoPersonajeResource = new CargoPersonajeResource(cargoPersonajeService);
        this.restCargoPersonajeMockMvc = MockMvcBuilders.standaloneSetup(cargoPersonajeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CargoPersonaje createEntity(EntityManager em) {
        CargoPersonaje cargoPersonaje = new CargoPersonaje()
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN)
            .observaciones(DEFAULT_OBSERVACIONES)
            .alcance(DEFAULT_ALCANCE);
        // Add required entity
        Cargo cargo = CargoResourceIntTest.createEntity(em);
        em.persist(cargo);
        em.flush();
        cargoPersonaje.setCargo(cargo);
        // Add required entity
        Personaje personaje = PersonajeResourceIntTest.createEntity(em);
        em.persist(personaje);
        em.flush();
        cargoPersonaje.setPersonaje(personaje);
        return cargoPersonaje;
    }

    @Before
    public void initTest() {
        cargoPersonajeSearchRepository.deleteAll();
        cargoPersonaje = createEntity(em);
    }

    @Test
    @Transactional
    public void createCargoPersonaje() throws Exception {
        int databaseSizeBeforeCreate = cargoPersonajeRepository.findAll().size();

        // Create the CargoPersonaje
        restCargoPersonajeMockMvc.perform(post("/api/cargo-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cargoPersonaje)))
            .andExpect(status().isCreated());

        // Validate the CargoPersonaje in the database
        List<CargoPersonaje> cargoPersonajeList = cargoPersonajeRepository.findAll();
        assertThat(cargoPersonajeList).hasSize(databaseSizeBeforeCreate + 1);
        CargoPersonaje testCargoPersonaje = cargoPersonajeList.get(cargoPersonajeList.size() - 1);
        assertThat(testCargoPersonaje.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testCargoPersonaje.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
        assertThat(testCargoPersonaje.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testCargoPersonaje.getAlcance()).isEqualTo(DEFAULT_ALCANCE);

        // Validate the CargoPersonaje in Elasticsearch
        CargoPersonaje cargoPersonajeEs = cargoPersonajeSearchRepository.findOne(testCargoPersonaje.getId());
        assertThat(cargoPersonajeEs).isEqualToIgnoringGivenFields(testCargoPersonaje);
    }

    @Test
    @Transactional
    public void createCargoPersonajeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cargoPersonajeRepository.findAll().size();

        // Create the CargoPersonaje with an existing ID
        cargoPersonaje.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCargoPersonajeMockMvc.perform(post("/api/cargo-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cargoPersonaje)))
            .andExpect(status().isBadRequest());

        // Validate the CargoPersonaje in the database
        List<CargoPersonaje> cargoPersonajeList = cargoPersonajeRepository.findAll();
        assertThat(cargoPersonajeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCargoPersonajes() throws Exception {
        // Initialize the database
        cargoPersonajeRepository.saveAndFlush(cargoPersonaje);

        // Get all the cargoPersonajeList
        restCargoPersonajeMockMvc.perform(get("/api/cargo-personajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cargoPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].alcance").value(hasItem(DEFAULT_ALCANCE.toString())));
    }

    @Test
    @Transactional
    public void getCargoPersonaje() throws Exception {
        // Initialize the database
        cargoPersonajeRepository.saveAndFlush(cargoPersonaje);

        // Get the cargoPersonaje
        restCargoPersonajeMockMvc.perform(get("/api/cargo-personajes/{id}", cargoPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cargoPersonaje.getId().intValue()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.alcance").value(DEFAULT_ALCANCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCargoPersonaje() throws Exception {
        // Get the cargoPersonaje
        restCargoPersonajeMockMvc.perform(get("/api/cargo-personajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCargoPersonaje() throws Exception {
        // Initialize the database
        cargoPersonajeService.save(cargoPersonaje);

        int databaseSizeBeforeUpdate = cargoPersonajeRepository.findAll().size();

        // Update the cargoPersonaje
        CargoPersonaje updatedCargoPersonaje = cargoPersonajeRepository.findOne(cargoPersonaje.getId());
        // Disconnect from session so that the updates on updatedCargoPersonaje are not directly saved in db
        em.detach(updatedCargoPersonaje);
        updatedCargoPersonaje
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .observaciones(UPDATED_OBSERVACIONES)
            .alcance(UPDATED_ALCANCE);

        restCargoPersonajeMockMvc.perform(put("/api/cargo-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCargoPersonaje)))
            .andExpect(status().isOk());

        // Validate the CargoPersonaje in the database
        List<CargoPersonaje> cargoPersonajeList = cargoPersonajeRepository.findAll();
        assertThat(cargoPersonajeList).hasSize(databaseSizeBeforeUpdate);
        CargoPersonaje testCargoPersonaje = cargoPersonajeList.get(cargoPersonajeList.size() - 1);
        assertThat(testCargoPersonaje.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testCargoPersonaje.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
        assertThat(testCargoPersonaje.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testCargoPersonaje.getAlcance()).isEqualTo(UPDATED_ALCANCE);

        // Validate the CargoPersonaje in Elasticsearch
        CargoPersonaje cargoPersonajeEs = cargoPersonajeSearchRepository.findOne(testCargoPersonaje.getId());
        assertThat(cargoPersonajeEs).isEqualToIgnoringGivenFields(testCargoPersonaje);
    }

    @Test
    @Transactional
    public void updateNonExistingCargoPersonaje() throws Exception {
        int databaseSizeBeforeUpdate = cargoPersonajeRepository.findAll().size();

        // Create the CargoPersonaje

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCargoPersonajeMockMvc.perform(put("/api/cargo-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cargoPersonaje)))
            .andExpect(status().isCreated());

        // Validate the CargoPersonaje in the database
        List<CargoPersonaje> cargoPersonajeList = cargoPersonajeRepository.findAll();
        assertThat(cargoPersonajeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCargoPersonaje() throws Exception {
        // Initialize the database
        cargoPersonajeService.save(cargoPersonaje);

        int databaseSizeBeforeDelete = cargoPersonajeRepository.findAll().size();

        // Get the cargoPersonaje
        restCargoPersonajeMockMvc.perform(delete("/api/cargo-personajes/{id}", cargoPersonaje.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean cargoPersonajeExistsInEs = cargoPersonajeSearchRepository.exists(cargoPersonaje.getId());
        assertThat(cargoPersonajeExistsInEs).isFalse();

        // Validate the database is empty
        List<CargoPersonaje> cargoPersonajeList = cargoPersonajeRepository.findAll();
        assertThat(cargoPersonajeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCargoPersonaje() throws Exception {
        // Initialize the database
        cargoPersonajeService.save(cargoPersonaje);

        // Search the cargoPersonaje
        restCargoPersonajeMockMvc.perform(get("/api/_search/cargo-personajes?query=id:" + cargoPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cargoPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].alcance").value(hasItem(DEFAULT_ALCANCE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CargoPersonaje.class);
        CargoPersonaje cargoPersonaje1 = new CargoPersonaje();
        cargoPersonaje1.setId(1L);
        CargoPersonaje cargoPersonaje2 = new CargoPersonaje();
        cargoPersonaje2.setId(cargoPersonaje1.getId());
        assertThat(cargoPersonaje1).isEqualTo(cargoPersonaje2);
        cargoPersonaje2.setId(2L);
        assertThat(cargoPersonaje1).isNotEqualTo(cargoPersonaje2);
        cargoPersonaje1.setId(null);
        assertThat(cargoPersonaje1).isNotEqualTo(cargoPersonaje2);
    }
}
