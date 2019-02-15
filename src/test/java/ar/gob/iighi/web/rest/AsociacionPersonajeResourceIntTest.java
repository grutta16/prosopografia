package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.AsociacionPersonaje;
import ar.gob.iighi.domain.Asociacion;
import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.repository.AsociacionPersonajeRepository;
import ar.gob.iighi.service.AsociacionPersonajeService;
import ar.gob.iighi.repository.search.AsociacionPersonajeSearchRepository;
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
 * Test class for the AsociacionPersonajeResource REST controller.
 *
 * @see AsociacionPersonajeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class AsociacionPersonajeResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_DESDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_DESDE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_HASTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_HASTA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AsociacionPersonajeRepository asociacionPersonajeRepository;

    @Autowired
    private AsociacionPersonajeService asociacionPersonajeService;

    @Autowired
    private AsociacionPersonajeSearchRepository asociacionPersonajeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAsociacionPersonajeMockMvc;

    private AsociacionPersonaje asociacionPersonaje;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AsociacionPersonajeResource asociacionPersonajeResource = new AsociacionPersonajeResource(asociacionPersonajeService);
        this.restAsociacionPersonajeMockMvc = MockMvcBuilders.standaloneSetup(asociacionPersonajeResource)
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
    public static AsociacionPersonaje createEntity(EntityManager em) {
        AsociacionPersonaje asociacionPersonaje = new AsociacionPersonaje()
            .fechaDesde(DEFAULT_FECHA_DESDE)
            .fechaHasta(DEFAULT_FECHA_HASTA);
        // Add required entity
        Asociacion asociacion = AsociacionResourceIntTest.createEntity(em);
        em.persist(asociacion);
        em.flush();
        asociacionPersonaje.setAsociacion(asociacion);
        // Add required entity
        Personaje personaje = PersonajeResourceIntTest.createEntity(em);
        em.persist(personaje);
        em.flush();
        asociacionPersonaje.setPersonaje(personaje);
        return asociacionPersonaje;
    }

    @Before
    public void initTest() {
        asociacionPersonajeSearchRepository.deleteAll();
        asociacionPersonaje = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsociacionPersonaje() throws Exception {
        int databaseSizeBeforeCreate = asociacionPersonajeRepository.findAll().size();

        // Create the AsociacionPersonaje
        restAsociacionPersonajeMockMvc.perform(post("/api/asociacion-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociacionPersonaje)))
            .andExpect(status().isCreated());

        // Validate the AsociacionPersonaje in the database
        List<AsociacionPersonaje> asociacionPersonajeList = asociacionPersonajeRepository.findAll();
        assertThat(asociacionPersonajeList).hasSize(databaseSizeBeforeCreate + 1);
        AsociacionPersonaje testAsociacionPersonaje = asociacionPersonajeList.get(asociacionPersonajeList.size() - 1);
        assertThat(testAsociacionPersonaje.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
        assertThat(testAsociacionPersonaje.getFechaHasta()).isEqualTo(DEFAULT_FECHA_HASTA);

        // Validate the AsociacionPersonaje in Elasticsearch
        AsociacionPersonaje asociacionPersonajeEs = asociacionPersonajeSearchRepository.findOne(testAsociacionPersonaje.getId());
        assertThat(asociacionPersonajeEs).isEqualToIgnoringGivenFields(testAsociacionPersonaje);
    }

    @Test
    @Transactional
    public void createAsociacionPersonajeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asociacionPersonajeRepository.findAll().size();

        // Create the AsociacionPersonaje with an existing ID
        asociacionPersonaje.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsociacionPersonajeMockMvc.perform(post("/api/asociacion-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociacionPersonaje)))
            .andExpect(status().isBadRequest());

        // Validate the AsociacionPersonaje in the database
        List<AsociacionPersonaje> asociacionPersonajeList = asociacionPersonajeRepository.findAll();
        assertThat(asociacionPersonajeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAsociacionPersonajes() throws Exception {
        // Initialize the database
        asociacionPersonajeRepository.saveAndFlush(asociacionPersonaje);

        // Get all the asociacionPersonajeList
        restAsociacionPersonajeMockMvc.perform(get("/api/asociacion-personajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asociacionPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    public void getAsociacionPersonaje() throws Exception {
        // Initialize the database
        asociacionPersonajeRepository.saveAndFlush(asociacionPersonaje);

        // Get the asociacionPersonaje
        restAsociacionPersonajeMockMvc.perform(get("/api/asociacion-personajes/{id}", asociacionPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(asociacionPersonaje.getId().intValue()))
            .andExpect(jsonPath("$.fechaDesde").value(DEFAULT_FECHA_DESDE.toString()))
            .andExpect(jsonPath("$.fechaHasta").value(DEFAULT_FECHA_HASTA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAsociacionPersonaje() throws Exception {
        // Get the asociacionPersonaje
        restAsociacionPersonajeMockMvc.perform(get("/api/asociacion-personajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsociacionPersonaje() throws Exception {
        // Initialize the database
        asociacionPersonajeService.save(asociacionPersonaje);

        int databaseSizeBeforeUpdate = asociacionPersonajeRepository.findAll().size();

        // Update the asociacionPersonaje
        AsociacionPersonaje updatedAsociacionPersonaje = asociacionPersonajeRepository.findOne(asociacionPersonaje.getId());
        // Disconnect from session so that the updates on updatedAsociacionPersonaje are not directly saved in db
        em.detach(updatedAsociacionPersonaje);
        updatedAsociacionPersonaje
            .fechaDesde(UPDATED_FECHA_DESDE)
            .fechaHasta(UPDATED_FECHA_HASTA);

        restAsociacionPersonajeMockMvc.perform(put("/api/asociacion-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsociacionPersonaje)))
            .andExpect(status().isOk());

        // Validate the AsociacionPersonaje in the database
        List<AsociacionPersonaje> asociacionPersonajeList = asociacionPersonajeRepository.findAll();
        assertThat(asociacionPersonajeList).hasSize(databaseSizeBeforeUpdate);
        AsociacionPersonaje testAsociacionPersonaje = asociacionPersonajeList.get(asociacionPersonajeList.size() - 1);
        assertThat(testAsociacionPersonaje.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
        assertThat(testAsociacionPersonaje.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);

        // Validate the AsociacionPersonaje in Elasticsearch
        AsociacionPersonaje asociacionPersonajeEs = asociacionPersonajeSearchRepository.findOne(testAsociacionPersonaje.getId());
        assertThat(asociacionPersonajeEs).isEqualToIgnoringGivenFields(testAsociacionPersonaje);
    }

    @Test
    @Transactional
    public void updateNonExistingAsociacionPersonaje() throws Exception {
        int databaseSizeBeforeUpdate = asociacionPersonajeRepository.findAll().size();

        // Create the AsociacionPersonaje

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAsociacionPersonajeMockMvc.perform(put("/api/asociacion-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociacionPersonaje)))
            .andExpect(status().isCreated());

        // Validate the AsociacionPersonaje in the database
        List<AsociacionPersonaje> asociacionPersonajeList = asociacionPersonajeRepository.findAll();
        assertThat(asociacionPersonajeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAsociacionPersonaje() throws Exception {
        // Initialize the database
        asociacionPersonajeService.save(asociacionPersonaje);

        int databaseSizeBeforeDelete = asociacionPersonajeRepository.findAll().size();

        // Get the asociacionPersonaje
        restAsociacionPersonajeMockMvc.perform(delete("/api/asociacion-personajes/{id}", asociacionPersonaje.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean asociacionPersonajeExistsInEs = asociacionPersonajeSearchRepository.exists(asociacionPersonaje.getId());
        assertThat(asociacionPersonajeExistsInEs).isFalse();

        // Validate the database is empty
        List<AsociacionPersonaje> asociacionPersonajeList = asociacionPersonajeRepository.findAll();
        assertThat(asociacionPersonajeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAsociacionPersonaje() throws Exception {
        // Initialize the database
        asociacionPersonajeService.save(asociacionPersonaje);

        // Search the asociacionPersonaje
        restAsociacionPersonajeMockMvc.perform(get("/api/_search/asociacion-personajes?query=id:" + asociacionPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asociacionPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AsociacionPersonaje.class);
        AsociacionPersonaje asociacionPersonaje1 = new AsociacionPersonaje();
        asociacionPersonaje1.setId(1L);
        AsociacionPersonaje asociacionPersonaje2 = new AsociacionPersonaje();
        asociacionPersonaje2.setId(asociacionPersonaje1.getId());
        assertThat(asociacionPersonaje1).isEqualTo(asociacionPersonaje2);
        asociacionPersonaje2.setId(2L);
        assertThat(asociacionPersonaje1).isNotEqualTo(asociacionPersonaje2);
        asociacionPersonaje1.setId(null);
        assertThat(asociacionPersonaje1).isNotEqualTo(asociacionPersonaje2);
    }
}
