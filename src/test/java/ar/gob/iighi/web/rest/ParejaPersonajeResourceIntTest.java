package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.ParejaPersonaje;
import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.repository.ParejaPersonajeRepository;
import ar.gob.iighi.service.ParejaPersonajeService;
import ar.gob.iighi.repository.search.ParejaPersonajeSearchRepository;
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

/**
 * Test class for the ParejaPersonajeResource REST controller.
 *
 * @see ParejaPersonajeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class ParejaPersonajeResourceIntTest {

    private static final String DEFAULT_NOMBRES = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRES = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDOS = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDOS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_DESDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_DESDE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_HASTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_HASTA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ParejaPersonajeRepository parejaPersonajeRepository;

    @Autowired
    private ParejaPersonajeService parejaPersonajeService;

    @Autowired
    private ParejaPersonajeSearchRepository parejaPersonajeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParejaPersonajeMockMvc;

    private ParejaPersonaje parejaPersonaje;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParejaPersonajeResource parejaPersonajeResource = new ParejaPersonajeResource(parejaPersonajeService);
        this.restParejaPersonajeMockMvc = MockMvcBuilders.standaloneSetup(parejaPersonajeResource)
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
    public static ParejaPersonaje createEntity(EntityManager em) {
        ParejaPersonaje parejaPersonaje = new ParejaPersonaje()
            .nombres(DEFAULT_NOMBRES)
            .apellidos(DEFAULT_APELLIDOS)
            .fechaDesde(DEFAULT_FECHA_DESDE)
            .fechaHasta(DEFAULT_FECHA_HASTA);
        // Add required entity
        Personaje personaje = PersonajeResourceIntTest.createEntity(em);
        em.persist(personaje);
        em.flush();
        parejaPersonaje.setPersonaje(personaje);
        return parejaPersonaje;
    }

    @Before
    public void initTest() {
        parejaPersonajeSearchRepository.deleteAll();
        parejaPersonaje = createEntity(em);
    }

    @Test
    @Transactional
    public void createParejaPersonaje() throws Exception {
        int databaseSizeBeforeCreate = parejaPersonajeRepository.findAll().size();

        // Create the ParejaPersonaje
        restParejaPersonajeMockMvc.perform(post("/api/pareja-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parejaPersonaje)))
            .andExpect(status().isCreated());

        // Validate the ParejaPersonaje in the database
        List<ParejaPersonaje> parejaPersonajeList = parejaPersonajeRepository.findAll();
        assertThat(parejaPersonajeList).hasSize(databaseSizeBeforeCreate + 1);
        ParejaPersonaje testParejaPersonaje = parejaPersonajeList.get(parejaPersonajeList.size() - 1);
        assertThat(testParejaPersonaje.getNombres()).isEqualTo(DEFAULT_NOMBRES);
        assertThat(testParejaPersonaje.getApellidos()).isEqualTo(DEFAULT_APELLIDOS);
        assertThat(testParejaPersonaje.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
        assertThat(testParejaPersonaje.getFechaHasta()).isEqualTo(DEFAULT_FECHA_HASTA);

        // Validate the ParejaPersonaje in Elasticsearch
        ParejaPersonaje parejaPersonajeEs = parejaPersonajeSearchRepository.findOne(testParejaPersonaje.getId());
        assertThat(parejaPersonajeEs).isEqualToIgnoringGivenFields(testParejaPersonaje);
    }

    @Test
    @Transactional
    public void createParejaPersonajeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parejaPersonajeRepository.findAll().size();

        // Create the ParejaPersonaje with an existing ID
        parejaPersonaje.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParejaPersonajeMockMvc.perform(post("/api/pareja-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parejaPersonaje)))
            .andExpect(status().isBadRequest());

        // Validate the ParejaPersonaje in the database
        List<ParejaPersonaje> parejaPersonajeList = parejaPersonajeRepository.findAll();
        assertThat(parejaPersonajeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombresIsRequired() throws Exception {
        int databaseSizeBeforeTest = parejaPersonajeRepository.findAll().size();
        // set the field null
        parejaPersonaje.setNombres(null);

        // Create the ParejaPersonaje, which fails.

        restParejaPersonajeMockMvc.perform(post("/api/pareja-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parejaPersonaje)))
            .andExpect(status().isBadRequest());

        List<ParejaPersonaje> parejaPersonajeList = parejaPersonajeRepository.findAll();
        assertThat(parejaPersonajeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkApellidosIsRequired() throws Exception {
        int databaseSizeBeforeTest = parejaPersonajeRepository.findAll().size();
        // set the field null
        parejaPersonaje.setApellidos(null);

        // Create the ParejaPersonaje, which fails.

        restParejaPersonajeMockMvc.perform(post("/api/pareja-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parejaPersonaje)))
            .andExpect(status().isBadRequest());

        List<ParejaPersonaje> parejaPersonajeList = parejaPersonajeRepository.findAll();
        assertThat(parejaPersonajeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllParejaPersonajes() throws Exception {
        // Initialize the database
        parejaPersonajeRepository.saveAndFlush(parejaPersonaje);

        // Get all the parejaPersonajeList
        restParejaPersonajeMockMvc.perform(get("/api/pareja-personajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parejaPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombres").value(hasItem(DEFAULT_NOMBRES.toString())))
            .andExpect(jsonPath("$.[*].apellidos").value(hasItem(DEFAULT_APELLIDOS.toString())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    public void getParejaPersonaje() throws Exception {
        // Initialize the database
        parejaPersonajeRepository.saveAndFlush(parejaPersonaje);

        // Get the parejaPersonaje
        restParejaPersonajeMockMvc.perform(get("/api/pareja-personajes/{id}", parejaPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parejaPersonaje.getId().intValue()))
            .andExpect(jsonPath("$.nombres").value(DEFAULT_NOMBRES.toString()))
            .andExpect(jsonPath("$.apellidos").value(DEFAULT_APELLIDOS.toString()))
            .andExpect(jsonPath("$.fechaDesde").value(DEFAULT_FECHA_DESDE.toString()))
            .andExpect(jsonPath("$.fechaHasta").value(DEFAULT_FECHA_HASTA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParejaPersonaje() throws Exception {
        // Get the parejaPersonaje
        restParejaPersonajeMockMvc.perform(get("/api/pareja-personajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParejaPersonaje() throws Exception {
        // Initialize the database
        parejaPersonajeService.save(parejaPersonaje);

        int databaseSizeBeforeUpdate = parejaPersonajeRepository.findAll().size();

        // Update the parejaPersonaje
        ParejaPersonaje updatedParejaPersonaje = parejaPersonajeRepository.findOne(parejaPersonaje.getId());
        // Disconnect from session so that the updates on updatedParejaPersonaje are not directly saved in db
        em.detach(updatedParejaPersonaje);
        updatedParejaPersonaje
            .nombres(UPDATED_NOMBRES)
            .apellidos(UPDATED_APELLIDOS)
            .fechaDesde(UPDATED_FECHA_DESDE)
            .fechaHasta(UPDATED_FECHA_HASTA);

        restParejaPersonajeMockMvc.perform(put("/api/pareja-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParejaPersonaje)))
            .andExpect(status().isOk());

        // Validate the ParejaPersonaje in the database
        List<ParejaPersonaje> parejaPersonajeList = parejaPersonajeRepository.findAll();
        assertThat(parejaPersonajeList).hasSize(databaseSizeBeforeUpdate);
        ParejaPersonaje testParejaPersonaje = parejaPersonajeList.get(parejaPersonajeList.size() - 1);
        assertThat(testParejaPersonaje.getNombres()).isEqualTo(UPDATED_NOMBRES);
        assertThat(testParejaPersonaje.getApellidos()).isEqualTo(UPDATED_APELLIDOS);
        assertThat(testParejaPersonaje.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
        assertThat(testParejaPersonaje.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);

        // Validate the ParejaPersonaje in Elasticsearch
        ParejaPersonaje parejaPersonajeEs = parejaPersonajeSearchRepository.findOne(testParejaPersonaje.getId());
        assertThat(parejaPersonajeEs).isEqualToIgnoringGivenFields(testParejaPersonaje);
    }

    @Test
    @Transactional
    public void updateNonExistingParejaPersonaje() throws Exception {
        int databaseSizeBeforeUpdate = parejaPersonajeRepository.findAll().size();

        // Create the ParejaPersonaje

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restParejaPersonajeMockMvc.perform(put("/api/pareja-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parejaPersonaje)))
            .andExpect(status().isCreated());

        // Validate the ParejaPersonaje in the database
        List<ParejaPersonaje> parejaPersonajeList = parejaPersonajeRepository.findAll();
        assertThat(parejaPersonajeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteParejaPersonaje() throws Exception {
        // Initialize the database
        parejaPersonajeService.save(parejaPersonaje);

        int databaseSizeBeforeDelete = parejaPersonajeRepository.findAll().size();

        // Get the parejaPersonaje
        restParejaPersonajeMockMvc.perform(delete("/api/pareja-personajes/{id}", parejaPersonaje.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean parejaPersonajeExistsInEs = parejaPersonajeSearchRepository.exists(parejaPersonaje.getId());
        assertThat(parejaPersonajeExistsInEs).isFalse();

        // Validate the database is empty
        List<ParejaPersonaje> parejaPersonajeList = parejaPersonajeRepository.findAll();
        assertThat(parejaPersonajeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchParejaPersonaje() throws Exception {
        // Initialize the database
        parejaPersonajeService.save(parejaPersonaje);

        // Search the parejaPersonaje
        restParejaPersonajeMockMvc.perform(get("/api/_search/pareja-personajes?query=id:" + parejaPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parejaPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombres").value(hasItem(DEFAULT_NOMBRES.toString())))
            .andExpect(jsonPath("$.[*].apellidos").value(hasItem(DEFAULT_APELLIDOS.toString())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParejaPersonaje.class);
        ParejaPersonaje parejaPersonaje1 = new ParejaPersonaje();
        parejaPersonaje1.setId(1L);
        ParejaPersonaje parejaPersonaje2 = new ParejaPersonaje();
        parejaPersonaje2.setId(parejaPersonaje1.getId());
        assertThat(parejaPersonaje1).isEqualTo(parejaPersonaje2);
        parejaPersonaje2.setId(2L);
        assertThat(parejaPersonaje1).isNotEqualTo(parejaPersonaje2);
        parejaPersonaje1.setId(null);
        assertThat(parejaPersonaje1).isNotEqualTo(parejaPersonaje2);
    }
}
