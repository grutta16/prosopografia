package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.Eleccion;
import ar.gob.iighi.domain.Cargo;
import ar.gob.iighi.repository.EleccionRepository;
import ar.gob.iighi.service.EleccionService;
import ar.gob.iighi.repository.search.EleccionSearchRepository;
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
 * Test class for the EleccionResource REST controller.
 *
 * @see EleccionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class EleccionResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_FUENTE = "AAAAAAAAAA";
    private static final String UPDATED_FUENTE = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Alcance DEFAULT_ALCANCE = Alcance.INTERNO;
    private static final Alcance UPDATED_ALCANCE = Alcance.DE_GOBIERNO;

    @Autowired
    private EleccionRepository eleccionRepository;

    @Autowired
    private EleccionService eleccionService;

    @Autowired
    private EleccionSearchRepository eleccionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEleccionMockMvc;

    private Eleccion eleccion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EleccionResource eleccionResource = new EleccionResource(eleccionService);
        this.restEleccionMockMvc = MockMvcBuilders.standaloneSetup(eleccionResource)
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
    public static Eleccion createEntity(EntityManager em) {
        Eleccion eleccion = new Eleccion()
            .nombre(DEFAULT_NOMBRE)
            .fecha(DEFAULT_FECHA)
            .fuente(DEFAULT_FUENTE)
            .observaciones(DEFAULT_OBSERVACIONES)
            .alcance(DEFAULT_ALCANCE);
        // Add required entity
        Cargo cargo = CargoResourceIntTest.createEntity(em);
        em.persist(cargo);
        em.flush();
        eleccion.setCargo(cargo);
        return eleccion;
    }

    @Before
    public void initTest() {
        eleccionSearchRepository.deleteAll();
        eleccion = createEntity(em);
    }

    @Test
    @Transactional
    public void createEleccion() throws Exception {
        int databaseSizeBeforeCreate = eleccionRepository.findAll().size();

        // Create the Eleccion
        restEleccionMockMvc.perform(post("/api/eleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eleccion)))
            .andExpect(status().isCreated());

        // Validate the Eleccion in the database
        List<Eleccion> eleccionList = eleccionRepository.findAll();
        assertThat(eleccionList).hasSize(databaseSizeBeforeCreate + 1);
        Eleccion testEleccion = eleccionList.get(eleccionList.size() - 1);
        assertThat(testEleccion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEleccion.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testEleccion.getFuente()).isEqualTo(DEFAULT_FUENTE);
        assertThat(testEleccion.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testEleccion.getAlcance()).isEqualTo(DEFAULT_ALCANCE);

        // Validate the Eleccion in Elasticsearch
        Eleccion eleccionEs = eleccionSearchRepository.findOne(testEleccion.getId());
        assertThat(eleccionEs).isEqualToIgnoringGivenFields(testEleccion);
    }

    @Test
    @Transactional
    public void createEleccionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eleccionRepository.findAll().size();

        // Create the Eleccion with an existing ID
        eleccion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEleccionMockMvc.perform(post("/api/eleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eleccion)))
            .andExpect(status().isBadRequest());

        // Validate the Eleccion in the database
        List<Eleccion> eleccionList = eleccionRepository.findAll();
        assertThat(eleccionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = eleccionRepository.findAll().size();
        // set the field null
        eleccion.setNombre(null);

        // Create the Eleccion, which fails.

        restEleccionMockMvc.perform(post("/api/eleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eleccion)))
            .andExpect(status().isBadRequest());

        List<Eleccion> eleccionList = eleccionRepository.findAll();
        assertThat(eleccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEleccions() throws Exception {
        // Initialize the database
        eleccionRepository.saveAndFlush(eleccion);

        // Get all the eleccionList
        restEleccionMockMvc.perform(get("/api/eleccions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eleccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].fuente").value(hasItem(DEFAULT_FUENTE.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].alcance").value(hasItem(DEFAULT_ALCANCE.toString())));
    }

    @Test
    @Transactional
    public void getEleccion() throws Exception {
        // Initialize the database
        eleccionRepository.saveAndFlush(eleccion);

        // Get the eleccion
        restEleccionMockMvc.perform(get("/api/eleccions/{id}", eleccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eleccion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.fuente").value(DEFAULT_FUENTE.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.alcance").value(DEFAULT_ALCANCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEleccion() throws Exception {
        // Get the eleccion
        restEleccionMockMvc.perform(get("/api/eleccions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEleccion() throws Exception {
        // Initialize the database
        eleccionService.save(eleccion);

        int databaseSizeBeforeUpdate = eleccionRepository.findAll().size();

        // Update the eleccion
        Eleccion updatedEleccion = eleccionRepository.findOne(eleccion.getId());
        // Disconnect from session so that the updates on updatedEleccion are not directly saved in db
        em.detach(updatedEleccion);
        updatedEleccion
            .nombre(UPDATED_NOMBRE)
            .fecha(UPDATED_FECHA)
            .fuente(UPDATED_FUENTE)
            .observaciones(UPDATED_OBSERVACIONES)
            .alcance(UPDATED_ALCANCE);

        restEleccionMockMvc.perform(put("/api/eleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEleccion)))
            .andExpect(status().isOk());

        // Validate the Eleccion in the database
        List<Eleccion> eleccionList = eleccionRepository.findAll();
        assertThat(eleccionList).hasSize(databaseSizeBeforeUpdate);
        Eleccion testEleccion = eleccionList.get(eleccionList.size() - 1);
        assertThat(testEleccion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEleccion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testEleccion.getFuente()).isEqualTo(UPDATED_FUENTE);
        assertThat(testEleccion.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testEleccion.getAlcance()).isEqualTo(UPDATED_ALCANCE);

        // Validate the Eleccion in Elasticsearch
        Eleccion eleccionEs = eleccionSearchRepository.findOne(testEleccion.getId());
        assertThat(eleccionEs).isEqualToIgnoringGivenFields(testEleccion);
    }

    @Test
    @Transactional
    public void updateNonExistingEleccion() throws Exception {
        int databaseSizeBeforeUpdate = eleccionRepository.findAll().size();

        // Create the Eleccion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEleccionMockMvc.perform(put("/api/eleccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eleccion)))
            .andExpect(status().isCreated());

        // Validate the Eleccion in the database
        List<Eleccion> eleccionList = eleccionRepository.findAll();
        assertThat(eleccionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEleccion() throws Exception {
        // Initialize the database
        eleccionService.save(eleccion);

        int databaseSizeBeforeDelete = eleccionRepository.findAll().size();

        // Get the eleccion
        restEleccionMockMvc.perform(delete("/api/eleccions/{id}", eleccion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean eleccionExistsInEs = eleccionSearchRepository.exists(eleccion.getId());
        assertThat(eleccionExistsInEs).isFalse();

        // Validate the database is empty
        List<Eleccion> eleccionList = eleccionRepository.findAll();
        assertThat(eleccionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEleccion() throws Exception {
        // Initialize the database
        eleccionService.save(eleccion);

        // Search the eleccion
        restEleccionMockMvc.perform(get("/api/_search/eleccions?query=id:" + eleccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eleccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].fuente").value(hasItem(DEFAULT_FUENTE.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].alcance").value(hasItem(DEFAULT_ALCANCE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Eleccion.class);
        Eleccion eleccion1 = new Eleccion();
        eleccion1.setId(1L);
        Eleccion eleccion2 = new Eleccion();
        eleccion2.setId(eleccion1.getId());
        assertThat(eleccion1).isEqualTo(eleccion2);
        eleccion2.setId(2L);
        assertThat(eleccion1).isNotEqualTo(eleccion2);
        eleccion1.setId(null);
        assertThat(eleccion1).isNotEqualTo(eleccion2);
    }
}
