package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.ResidenciaPersonaje;
import ar.gob.iighi.domain.Lugar;
import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.repository.ResidenciaPersonajeRepository;
import ar.gob.iighi.service.ResidenciaPersonajeService;
import ar.gob.iighi.repository.search.ResidenciaPersonajeSearchRepository;
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
 * Test class for the ResidenciaPersonajeResource REST controller.
 *
 * @see ResidenciaPersonajeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class ResidenciaPersonajeResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_DESDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_DESDE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_HASTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_HASTA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ResidenciaPersonajeRepository residenciaPersonajeRepository;

    @Autowired
    private ResidenciaPersonajeService residenciaPersonajeService;

    @Autowired
    private ResidenciaPersonajeSearchRepository residenciaPersonajeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restResidenciaPersonajeMockMvc;

    private ResidenciaPersonaje residenciaPersonaje;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ResidenciaPersonajeResource residenciaPersonajeResource = new ResidenciaPersonajeResource(residenciaPersonajeService);
        this.restResidenciaPersonajeMockMvc = MockMvcBuilders.standaloneSetup(residenciaPersonajeResource)
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
    public static ResidenciaPersonaje createEntity(EntityManager em) {
        ResidenciaPersonaje residenciaPersonaje = new ResidenciaPersonaje()
            .fechaDesde(DEFAULT_FECHA_DESDE)
            .fechaHasta(DEFAULT_FECHA_HASTA);
        // Add required entity
        Lugar lugar = LugarResourceIntTest.createEntity(em);
        em.persist(lugar);
        em.flush();
        residenciaPersonaje.setLugar(lugar);
        // Add required entity
        Personaje personaje = PersonajeResourceIntTest.createEntity(em);
        em.persist(personaje);
        em.flush();
        residenciaPersonaje.setPersonaje(personaje);
        return residenciaPersonaje;
    }

    @Before
    public void initTest() {
        residenciaPersonajeSearchRepository.deleteAll();
        residenciaPersonaje = createEntity(em);
    }

    @Test
    @Transactional
    public void createResidenciaPersonaje() throws Exception {
        int databaseSizeBeforeCreate = residenciaPersonajeRepository.findAll().size();

        // Create the ResidenciaPersonaje
        restResidenciaPersonajeMockMvc.perform(post("/api/residencia-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(residenciaPersonaje)))
            .andExpect(status().isCreated());

        // Validate the ResidenciaPersonaje in the database
        List<ResidenciaPersonaje> residenciaPersonajeList = residenciaPersonajeRepository.findAll();
        assertThat(residenciaPersonajeList).hasSize(databaseSizeBeforeCreate + 1);
        ResidenciaPersonaje testResidenciaPersonaje = residenciaPersonajeList.get(residenciaPersonajeList.size() - 1);
        assertThat(testResidenciaPersonaje.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
        assertThat(testResidenciaPersonaje.getFechaHasta()).isEqualTo(DEFAULT_FECHA_HASTA);

        // Validate the ResidenciaPersonaje in Elasticsearch
        ResidenciaPersonaje residenciaPersonajeEs = residenciaPersonajeSearchRepository.findOne(testResidenciaPersonaje.getId());
        assertThat(residenciaPersonajeEs).isEqualToIgnoringGivenFields(testResidenciaPersonaje);
    }

    @Test
    @Transactional
    public void createResidenciaPersonajeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = residenciaPersonajeRepository.findAll().size();

        // Create the ResidenciaPersonaje with an existing ID
        residenciaPersonaje.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResidenciaPersonajeMockMvc.perform(post("/api/residencia-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(residenciaPersonaje)))
            .andExpect(status().isBadRequest());

        // Validate the ResidenciaPersonaje in the database
        List<ResidenciaPersonaje> residenciaPersonajeList = residenciaPersonajeRepository.findAll();
        assertThat(residenciaPersonajeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllResidenciaPersonajes() throws Exception {
        // Initialize the database
        residenciaPersonajeRepository.saveAndFlush(residenciaPersonaje);

        // Get all the residenciaPersonajeList
        restResidenciaPersonajeMockMvc.perform(get("/api/residencia-personajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(residenciaPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    public void getResidenciaPersonaje() throws Exception {
        // Initialize the database
        residenciaPersonajeRepository.saveAndFlush(residenciaPersonaje);

        // Get the residenciaPersonaje
        restResidenciaPersonajeMockMvc.perform(get("/api/residencia-personajes/{id}", residenciaPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(residenciaPersonaje.getId().intValue()))
            .andExpect(jsonPath("$.fechaDesde").value(DEFAULT_FECHA_DESDE.toString()))
            .andExpect(jsonPath("$.fechaHasta").value(DEFAULT_FECHA_HASTA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingResidenciaPersonaje() throws Exception {
        // Get the residenciaPersonaje
        restResidenciaPersonajeMockMvc.perform(get("/api/residencia-personajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResidenciaPersonaje() throws Exception {
        // Initialize the database
        residenciaPersonajeService.save(residenciaPersonaje);

        int databaseSizeBeforeUpdate = residenciaPersonajeRepository.findAll().size();

        // Update the residenciaPersonaje
        ResidenciaPersonaje updatedResidenciaPersonaje = residenciaPersonajeRepository.findOne(residenciaPersonaje.getId());
        // Disconnect from session so that the updates on updatedResidenciaPersonaje are not directly saved in db
        em.detach(updatedResidenciaPersonaje);
        updatedResidenciaPersonaje
            .fechaDesde(UPDATED_FECHA_DESDE)
            .fechaHasta(UPDATED_FECHA_HASTA);

        restResidenciaPersonajeMockMvc.perform(put("/api/residencia-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedResidenciaPersonaje)))
            .andExpect(status().isOk());

        // Validate the ResidenciaPersonaje in the database
        List<ResidenciaPersonaje> residenciaPersonajeList = residenciaPersonajeRepository.findAll();
        assertThat(residenciaPersonajeList).hasSize(databaseSizeBeforeUpdate);
        ResidenciaPersonaje testResidenciaPersonaje = residenciaPersonajeList.get(residenciaPersonajeList.size() - 1);
        assertThat(testResidenciaPersonaje.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
        assertThat(testResidenciaPersonaje.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);

        // Validate the ResidenciaPersonaje in Elasticsearch
        ResidenciaPersonaje residenciaPersonajeEs = residenciaPersonajeSearchRepository.findOne(testResidenciaPersonaje.getId());
        assertThat(residenciaPersonajeEs).isEqualToIgnoringGivenFields(testResidenciaPersonaje);
    }

    @Test
    @Transactional
    public void updateNonExistingResidenciaPersonaje() throws Exception {
        int databaseSizeBeforeUpdate = residenciaPersonajeRepository.findAll().size();

        // Create the ResidenciaPersonaje

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restResidenciaPersonajeMockMvc.perform(put("/api/residencia-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(residenciaPersonaje)))
            .andExpect(status().isCreated());

        // Validate the ResidenciaPersonaje in the database
        List<ResidenciaPersonaje> residenciaPersonajeList = residenciaPersonajeRepository.findAll();
        assertThat(residenciaPersonajeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteResidenciaPersonaje() throws Exception {
        // Initialize the database
        residenciaPersonajeService.save(residenciaPersonaje);

        int databaseSizeBeforeDelete = residenciaPersonajeRepository.findAll().size();

        // Get the residenciaPersonaje
        restResidenciaPersonajeMockMvc.perform(delete("/api/residencia-personajes/{id}", residenciaPersonaje.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean residenciaPersonajeExistsInEs = residenciaPersonajeSearchRepository.exists(residenciaPersonaje.getId());
        assertThat(residenciaPersonajeExistsInEs).isFalse();

        // Validate the database is empty
        List<ResidenciaPersonaje> residenciaPersonajeList = residenciaPersonajeRepository.findAll();
        assertThat(residenciaPersonajeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchResidenciaPersonaje() throws Exception {
        // Initialize the database
        residenciaPersonajeService.save(residenciaPersonaje);

        // Search the residenciaPersonaje
        restResidenciaPersonajeMockMvc.perform(get("/api/_search/residencia-personajes?query=id:" + residenciaPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(residenciaPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResidenciaPersonaje.class);
        ResidenciaPersonaje residenciaPersonaje1 = new ResidenciaPersonaje();
        residenciaPersonaje1.setId(1L);
        ResidenciaPersonaje residenciaPersonaje2 = new ResidenciaPersonaje();
        residenciaPersonaje2.setId(residenciaPersonaje1.getId());
        assertThat(residenciaPersonaje1).isEqualTo(residenciaPersonaje2);
        residenciaPersonaje2.setId(2L);
        assertThat(residenciaPersonaje1).isNotEqualTo(residenciaPersonaje2);
        residenciaPersonaje1.setId(null);
        assertThat(residenciaPersonaje1).isNotEqualTo(residenciaPersonaje2);
    }
}
