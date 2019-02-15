package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.ReligionPersonaje;
import ar.gob.iighi.domain.Religion;
import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.repository.ReligionPersonajeRepository;
import ar.gob.iighi.service.ReligionPersonajeService;
import ar.gob.iighi.repository.search.ReligionPersonajeSearchRepository;
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
 * Test class for the ReligionPersonajeResource REST controller.
 *
 * @see ReligionPersonajeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class ReligionPersonajeResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_DESDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_DESDE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_HASTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_HASTA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ReligionPersonajeRepository religionPersonajeRepository;

    @Autowired
    private ReligionPersonajeService religionPersonajeService;

    @Autowired
    private ReligionPersonajeSearchRepository religionPersonajeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReligionPersonajeMockMvc;

    private ReligionPersonaje religionPersonaje;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReligionPersonajeResource religionPersonajeResource = new ReligionPersonajeResource(religionPersonajeService);
        this.restReligionPersonajeMockMvc = MockMvcBuilders.standaloneSetup(religionPersonajeResource)
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
    public static ReligionPersonaje createEntity(EntityManager em) {
        ReligionPersonaje religionPersonaje = new ReligionPersonaje()
            .fechaDesde(DEFAULT_FECHA_DESDE)
            .fechaHasta(DEFAULT_FECHA_HASTA);
        // Add required entity
        Religion religion = ReligionResourceIntTest.createEntity(em);
        em.persist(religion);
        em.flush();
        religionPersonaje.setReligion(religion);
        // Add required entity
        Personaje personaje = PersonajeResourceIntTest.createEntity(em);
        em.persist(personaje);
        em.flush();
        religionPersonaje.setPersonaje(personaje);
        return religionPersonaje;
    }

    @Before
    public void initTest() {
        religionPersonajeSearchRepository.deleteAll();
        religionPersonaje = createEntity(em);
    }

    @Test
    @Transactional
    public void createReligionPersonaje() throws Exception {
        int databaseSizeBeforeCreate = religionPersonajeRepository.findAll().size();

        // Create the ReligionPersonaje
        restReligionPersonajeMockMvc.perform(post("/api/religion-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(religionPersonaje)))
            .andExpect(status().isCreated());

        // Validate the ReligionPersonaje in the database
        List<ReligionPersonaje> religionPersonajeList = religionPersonajeRepository.findAll();
        assertThat(religionPersonajeList).hasSize(databaseSizeBeforeCreate + 1);
        ReligionPersonaje testReligionPersonaje = religionPersonajeList.get(religionPersonajeList.size() - 1);
        assertThat(testReligionPersonaje.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
        assertThat(testReligionPersonaje.getFechaHasta()).isEqualTo(DEFAULT_FECHA_HASTA);

        // Validate the ReligionPersonaje in Elasticsearch
        ReligionPersonaje religionPersonajeEs = religionPersonajeSearchRepository.findOne(testReligionPersonaje.getId());
        assertThat(religionPersonajeEs).isEqualToIgnoringGivenFields(testReligionPersonaje);
    }

    @Test
    @Transactional
    public void createReligionPersonajeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = religionPersonajeRepository.findAll().size();

        // Create the ReligionPersonaje with an existing ID
        religionPersonaje.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReligionPersonajeMockMvc.perform(post("/api/religion-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(religionPersonaje)))
            .andExpect(status().isBadRequest());

        // Validate the ReligionPersonaje in the database
        List<ReligionPersonaje> religionPersonajeList = religionPersonajeRepository.findAll();
        assertThat(religionPersonajeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReligionPersonajes() throws Exception {
        // Initialize the database
        religionPersonajeRepository.saveAndFlush(religionPersonaje);

        // Get all the religionPersonajeList
        restReligionPersonajeMockMvc.perform(get("/api/religion-personajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(religionPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    public void getReligionPersonaje() throws Exception {
        // Initialize the database
        religionPersonajeRepository.saveAndFlush(religionPersonaje);

        // Get the religionPersonaje
        restReligionPersonajeMockMvc.perform(get("/api/religion-personajes/{id}", religionPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(religionPersonaje.getId().intValue()))
            .andExpect(jsonPath("$.fechaDesde").value(DEFAULT_FECHA_DESDE.toString()))
            .andExpect(jsonPath("$.fechaHasta").value(DEFAULT_FECHA_HASTA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReligionPersonaje() throws Exception {
        // Get the religionPersonaje
        restReligionPersonajeMockMvc.perform(get("/api/religion-personajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReligionPersonaje() throws Exception {
        // Initialize the database
        religionPersonajeService.save(religionPersonaje);

        int databaseSizeBeforeUpdate = religionPersonajeRepository.findAll().size();

        // Update the religionPersonaje
        ReligionPersonaje updatedReligionPersonaje = religionPersonajeRepository.findOne(religionPersonaje.getId());
        // Disconnect from session so that the updates on updatedReligionPersonaje are not directly saved in db
        em.detach(updatedReligionPersonaje);
        updatedReligionPersonaje
            .fechaDesde(UPDATED_FECHA_DESDE)
            .fechaHasta(UPDATED_FECHA_HASTA);

        restReligionPersonajeMockMvc.perform(put("/api/religion-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReligionPersonaje)))
            .andExpect(status().isOk());

        // Validate the ReligionPersonaje in the database
        List<ReligionPersonaje> religionPersonajeList = religionPersonajeRepository.findAll();
        assertThat(religionPersonajeList).hasSize(databaseSizeBeforeUpdate);
        ReligionPersonaje testReligionPersonaje = religionPersonajeList.get(religionPersonajeList.size() - 1);
        assertThat(testReligionPersonaje.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
        assertThat(testReligionPersonaje.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);

        // Validate the ReligionPersonaje in Elasticsearch
        ReligionPersonaje religionPersonajeEs = religionPersonajeSearchRepository.findOne(testReligionPersonaje.getId());
        assertThat(religionPersonajeEs).isEqualToIgnoringGivenFields(testReligionPersonaje);
    }

    @Test
    @Transactional
    public void updateNonExistingReligionPersonaje() throws Exception {
        int databaseSizeBeforeUpdate = religionPersonajeRepository.findAll().size();

        // Create the ReligionPersonaje

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReligionPersonajeMockMvc.perform(put("/api/religion-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(religionPersonaje)))
            .andExpect(status().isCreated());

        // Validate the ReligionPersonaje in the database
        List<ReligionPersonaje> religionPersonajeList = religionPersonajeRepository.findAll();
        assertThat(religionPersonajeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReligionPersonaje() throws Exception {
        // Initialize the database
        religionPersonajeService.save(religionPersonaje);

        int databaseSizeBeforeDelete = religionPersonajeRepository.findAll().size();

        // Get the religionPersonaje
        restReligionPersonajeMockMvc.perform(delete("/api/religion-personajes/{id}", religionPersonaje.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean religionPersonajeExistsInEs = religionPersonajeSearchRepository.exists(religionPersonaje.getId());
        assertThat(religionPersonajeExistsInEs).isFalse();

        // Validate the database is empty
        List<ReligionPersonaje> religionPersonajeList = religionPersonajeRepository.findAll();
        assertThat(religionPersonajeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchReligionPersonaje() throws Exception {
        // Initialize the database
        religionPersonajeService.save(religionPersonaje);

        // Search the religionPersonaje
        restReligionPersonajeMockMvc.perform(get("/api/_search/religion-personajes?query=id:" + religionPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(religionPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReligionPersonaje.class);
        ReligionPersonaje religionPersonaje1 = new ReligionPersonaje();
        religionPersonaje1.setId(1L);
        ReligionPersonaje religionPersonaje2 = new ReligionPersonaje();
        religionPersonaje2.setId(religionPersonaje1.getId());
        assertThat(religionPersonaje1).isEqualTo(religionPersonaje2);
        religionPersonaje2.setId(2L);
        assertThat(religionPersonaje1).isNotEqualTo(religionPersonaje2);
        religionPersonaje1.setId(null);
        assertThat(religionPersonaje1).isNotEqualTo(religionPersonaje2);
    }
}
