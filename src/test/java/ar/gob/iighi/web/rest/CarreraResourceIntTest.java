package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.Carrera;
import ar.gob.iighi.repository.CarreraRepository;
import ar.gob.iighi.service.CarreraService;
import ar.gob.iighi.repository.search.CarreraSearchRepository;
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
import java.util.List;

import static ar.gob.iighi.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CarreraResource REST controller.
 *
 * @see CarreraResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class CarreraResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final Float DEFAULT_DURACION = 1F;
    private static final Float UPDATED_DURACION = 2F;

    @Autowired
    private CarreraRepository carreraRepository;

    @Autowired
    private CarreraService carreraService;

    @Autowired
    private CarreraSearchRepository carreraSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCarreraMockMvc;

    private Carrera carrera;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarreraResource carreraResource = new CarreraResource(carreraService);
        this.restCarreraMockMvc = MockMvcBuilders.standaloneSetup(carreraResource)
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
    public static Carrera createEntity(EntityManager em) {
        Carrera carrera = new Carrera()
            .nombre(DEFAULT_NOMBRE)
            .titulo(DEFAULT_TITULO)
            .duracion(DEFAULT_DURACION);
        return carrera;
    }

    @Before
    public void initTest() {
        carreraSearchRepository.deleteAll();
        carrera = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarrera() throws Exception {
        int databaseSizeBeforeCreate = carreraRepository.findAll().size();

        // Create the Carrera
        restCarreraMockMvc.perform(post("/api/carreras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carrera)))
            .andExpect(status().isCreated());

        // Validate the Carrera in the database
        List<Carrera> carreraList = carreraRepository.findAll();
        assertThat(carreraList).hasSize(databaseSizeBeforeCreate + 1);
        Carrera testCarrera = carreraList.get(carreraList.size() - 1);
        assertThat(testCarrera.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCarrera.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testCarrera.getDuracion()).isEqualTo(DEFAULT_DURACION);

        // Validate the Carrera in Elasticsearch
        Carrera carreraEs = carreraSearchRepository.findOne(testCarrera.getId());
        assertThat(carreraEs).isEqualToIgnoringGivenFields(testCarrera);
    }

    @Test
    @Transactional
    public void createCarreraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carreraRepository.findAll().size();

        // Create the Carrera with an existing ID
        carrera.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarreraMockMvc.perform(post("/api/carreras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carrera)))
            .andExpect(status().isBadRequest());

        // Validate the Carrera in the database
        List<Carrera> carreraList = carreraRepository.findAll();
        assertThat(carreraList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = carreraRepository.findAll().size();
        // set the field null
        carrera.setNombre(null);

        // Create the Carrera, which fails.

        restCarreraMockMvc.perform(post("/api/carreras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carrera)))
            .andExpect(status().isBadRequest());

        List<Carrera> carreraList = carreraRepository.findAll();
        assertThat(carreraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTituloIsRequired() throws Exception {
        int databaseSizeBeforeTest = carreraRepository.findAll().size();
        // set the field null
        carrera.setTitulo(null);

        // Create the Carrera, which fails.

        restCarreraMockMvc.perform(post("/api/carreras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carrera)))
            .andExpect(status().isBadRequest());

        List<Carrera> carreraList = carreraRepository.findAll();
        assertThat(carreraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDuracionIsRequired() throws Exception {
        int databaseSizeBeforeTest = carreraRepository.findAll().size();
        // set the field null
        carrera.setDuracion(null);

        // Create the Carrera, which fails.

        restCarreraMockMvc.perform(post("/api/carreras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carrera)))
            .andExpect(status().isBadRequest());

        List<Carrera> carreraList = carreraRepository.findAll();
        assertThat(carreraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCarreras() throws Exception {
        // Initialize the database
        carreraRepository.saveAndFlush(carrera);

        // Get all the carreraList
        restCarreraMockMvc.perform(get("/api/carreras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carrera.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].duracion").value(hasItem(DEFAULT_DURACION.doubleValue())));
    }

    @Test
    @Transactional
    public void getCarrera() throws Exception {
        // Initialize the database
        carreraRepository.saveAndFlush(carrera);

        // Get the carrera
        restCarreraMockMvc.perform(get("/api/carreras/{id}", carrera.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carrera.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.duracion").value(DEFAULT_DURACION.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCarrera() throws Exception {
        // Get the carrera
        restCarreraMockMvc.perform(get("/api/carreras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarrera() throws Exception {
        // Initialize the database
        carreraService.save(carrera);

        int databaseSizeBeforeUpdate = carreraRepository.findAll().size();

        // Update the carrera
        Carrera updatedCarrera = carreraRepository.findOne(carrera.getId());
        // Disconnect from session so that the updates on updatedCarrera are not directly saved in db
        em.detach(updatedCarrera);
        updatedCarrera
            .nombre(UPDATED_NOMBRE)
            .titulo(UPDATED_TITULO)
            .duracion(UPDATED_DURACION);

        restCarreraMockMvc.perform(put("/api/carreras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarrera)))
            .andExpect(status().isOk());

        // Validate the Carrera in the database
        List<Carrera> carreraList = carreraRepository.findAll();
        assertThat(carreraList).hasSize(databaseSizeBeforeUpdate);
        Carrera testCarrera = carreraList.get(carreraList.size() - 1);
        assertThat(testCarrera.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCarrera.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testCarrera.getDuracion()).isEqualTo(UPDATED_DURACION);

        // Validate the Carrera in Elasticsearch
        Carrera carreraEs = carreraSearchRepository.findOne(testCarrera.getId());
        assertThat(carreraEs).isEqualToIgnoringGivenFields(testCarrera);
    }

    @Test
    @Transactional
    public void updateNonExistingCarrera() throws Exception {
        int databaseSizeBeforeUpdate = carreraRepository.findAll().size();

        // Create the Carrera

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCarreraMockMvc.perform(put("/api/carreras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carrera)))
            .andExpect(status().isCreated());

        // Validate the Carrera in the database
        List<Carrera> carreraList = carreraRepository.findAll();
        assertThat(carreraList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCarrera() throws Exception {
        // Initialize the database
        carreraService.save(carrera);

        int databaseSizeBeforeDelete = carreraRepository.findAll().size();

        // Get the carrera
        restCarreraMockMvc.perform(delete("/api/carreras/{id}", carrera.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean carreraExistsInEs = carreraSearchRepository.exists(carrera.getId());
        assertThat(carreraExistsInEs).isFalse();

        // Validate the database is empty
        List<Carrera> carreraList = carreraRepository.findAll();
        assertThat(carreraList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCarrera() throws Exception {
        // Initialize the database
        carreraService.save(carrera);

        // Search the carrera
        restCarreraMockMvc.perform(get("/api/_search/carreras?query=id:" + carrera.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carrera.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].duracion").value(hasItem(DEFAULT_DURACION.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Carrera.class);
        Carrera carrera1 = new Carrera();
        carrera1.setId(1L);
        Carrera carrera2 = new Carrera();
        carrera2.setId(carrera1.getId());
        assertThat(carrera1).isEqualTo(carrera2);
        carrera2.setId(2L);
        assertThat(carrera1).isNotEqualTo(carrera2);
        carrera1.setId(null);
        assertThat(carrera1).isNotEqualTo(carrera2);
    }
}
