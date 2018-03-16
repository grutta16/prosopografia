package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.PartidoPersonaje;
import ar.gob.iighi.domain.Partido;
import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.repository.PartidoPersonajeRepository;
import ar.gob.iighi.service.PartidoPersonajeService;
import ar.gob.iighi.repository.search.PartidoPersonajeSearchRepository;
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
 * Test class for the PartidoPersonajeResource REST controller.
 *
 * @see PartidoPersonajeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class PartidoPersonajeResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_DESDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_DESDE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_HASTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_HASTA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PartidoPersonajeRepository partidoPersonajeRepository;

    @Autowired
    private PartidoPersonajeService partidoPersonajeService;

    @Autowired
    private PartidoPersonajeSearchRepository partidoPersonajeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPartidoPersonajeMockMvc;

    private PartidoPersonaje partidoPersonaje;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartidoPersonajeResource partidoPersonajeResource = new PartidoPersonajeResource(partidoPersonajeService);
        this.restPartidoPersonajeMockMvc = MockMvcBuilders.standaloneSetup(partidoPersonajeResource)
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
    public static PartidoPersonaje createEntity(EntityManager em) {
        PartidoPersonaje partidoPersonaje = new PartidoPersonaje()
            .fechaDesde(DEFAULT_FECHA_DESDE)
            .fechaHasta(DEFAULT_FECHA_HASTA);
        // Add required entity
        Partido partido = PartidoResourceIntTest.createEntity(em);
        em.persist(partido);
        em.flush();
        partidoPersonaje.setPartido(partido);
        // Add required entity
        Personaje personaje = PersonajeResourceIntTest.createEntity(em);
        em.persist(personaje);
        em.flush();
        partidoPersonaje.setPersonaje(personaje);
        return partidoPersonaje;
    }

    @Before
    public void initTest() {
        partidoPersonajeSearchRepository.deleteAll();
        partidoPersonaje = createEntity(em);
    }

    @Test
    @Transactional
    public void createPartidoPersonaje() throws Exception {
        int databaseSizeBeforeCreate = partidoPersonajeRepository.findAll().size();

        // Create the PartidoPersonaje
        restPartidoPersonajeMockMvc.perform(post("/api/partido-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partidoPersonaje)))
            .andExpect(status().isCreated());

        // Validate the PartidoPersonaje in the database
        List<PartidoPersonaje> partidoPersonajeList = partidoPersonajeRepository.findAll();
        assertThat(partidoPersonajeList).hasSize(databaseSizeBeforeCreate + 1);
        PartidoPersonaje testPartidoPersonaje = partidoPersonajeList.get(partidoPersonajeList.size() - 1);
        assertThat(testPartidoPersonaje.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
        assertThat(testPartidoPersonaje.getFechaHasta()).isEqualTo(DEFAULT_FECHA_HASTA);

        // Validate the PartidoPersonaje in Elasticsearch
        PartidoPersonaje partidoPersonajeEs = partidoPersonajeSearchRepository.findOne(testPartidoPersonaje.getId());
        assertThat(partidoPersonajeEs).isEqualToIgnoringGivenFields(testPartidoPersonaje);
    }

    @Test
    @Transactional
    public void createPartidoPersonajeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partidoPersonajeRepository.findAll().size();

        // Create the PartidoPersonaje with an existing ID
        partidoPersonaje.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartidoPersonajeMockMvc.perform(post("/api/partido-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partidoPersonaje)))
            .andExpect(status().isBadRequest());

        // Validate the PartidoPersonaje in the database
        List<PartidoPersonaje> partidoPersonajeList = partidoPersonajeRepository.findAll();
        assertThat(partidoPersonajeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPartidoPersonajes() throws Exception {
        // Initialize the database
        partidoPersonajeRepository.saveAndFlush(partidoPersonaje);

        // Get all the partidoPersonajeList
        restPartidoPersonajeMockMvc.perform(get("/api/partido-personajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partidoPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    public void getPartidoPersonaje() throws Exception {
        // Initialize the database
        partidoPersonajeRepository.saveAndFlush(partidoPersonaje);

        // Get the partidoPersonaje
        restPartidoPersonajeMockMvc.perform(get("/api/partido-personajes/{id}", partidoPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(partidoPersonaje.getId().intValue()))
            .andExpect(jsonPath("$.fechaDesde").value(DEFAULT_FECHA_DESDE.toString()))
            .andExpect(jsonPath("$.fechaHasta").value(DEFAULT_FECHA_HASTA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPartidoPersonaje() throws Exception {
        // Get the partidoPersonaje
        restPartidoPersonajeMockMvc.perform(get("/api/partido-personajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePartidoPersonaje() throws Exception {
        // Initialize the database
        partidoPersonajeService.save(partidoPersonaje);

        int databaseSizeBeforeUpdate = partidoPersonajeRepository.findAll().size();

        // Update the partidoPersonaje
        PartidoPersonaje updatedPartidoPersonaje = partidoPersonajeRepository.findOne(partidoPersonaje.getId());
        // Disconnect from session so that the updates on updatedPartidoPersonaje are not directly saved in db
        em.detach(updatedPartidoPersonaje);
        updatedPartidoPersonaje
            .fechaDesde(UPDATED_FECHA_DESDE)
            .fechaHasta(UPDATED_FECHA_HASTA);

        restPartidoPersonajeMockMvc.perform(put("/api/partido-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPartidoPersonaje)))
            .andExpect(status().isOk());

        // Validate the PartidoPersonaje in the database
        List<PartidoPersonaje> partidoPersonajeList = partidoPersonajeRepository.findAll();
        assertThat(partidoPersonajeList).hasSize(databaseSizeBeforeUpdate);
        PartidoPersonaje testPartidoPersonaje = partidoPersonajeList.get(partidoPersonajeList.size() - 1);
        assertThat(testPartidoPersonaje.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
        assertThat(testPartidoPersonaje.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);

        // Validate the PartidoPersonaje in Elasticsearch
        PartidoPersonaje partidoPersonajeEs = partidoPersonajeSearchRepository.findOne(testPartidoPersonaje.getId());
        assertThat(partidoPersonajeEs).isEqualToIgnoringGivenFields(testPartidoPersonaje);
    }

    @Test
    @Transactional
    public void updateNonExistingPartidoPersonaje() throws Exception {
        int databaseSizeBeforeUpdate = partidoPersonajeRepository.findAll().size();

        // Create the PartidoPersonaje

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPartidoPersonajeMockMvc.perform(put("/api/partido-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partidoPersonaje)))
            .andExpect(status().isCreated());

        // Validate the PartidoPersonaje in the database
        List<PartidoPersonaje> partidoPersonajeList = partidoPersonajeRepository.findAll();
        assertThat(partidoPersonajeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePartidoPersonaje() throws Exception {
        // Initialize the database
        partidoPersonajeService.save(partidoPersonaje);

        int databaseSizeBeforeDelete = partidoPersonajeRepository.findAll().size();

        // Get the partidoPersonaje
        restPartidoPersonajeMockMvc.perform(delete("/api/partido-personajes/{id}", partidoPersonaje.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean partidoPersonajeExistsInEs = partidoPersonajeSearchRepository.exists(partidoPersonaje.getId());
        assertThat(partidoPersonajeExistsInEs).isFalse();

        // Validate the database is empty
        List<PartidoPersonaje> partidoPersonajeList = partidoPersonajeRepository.findAll();
        assertThat(partidoPersonajeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPartidoPersonaje() throws Exception {
        // Initialize the database
        partidoPersonajeService.save(partidoPersonaje);

        // Search the partidoPersonaje
        restPartidoPersonajeMockMvc.perform(get("/api/_search/partido-personajes?query=id:" + partidoPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partidoPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PartidoPersonaje.class);
        PartidoPersonaje partidoPersonaje1 = new PartidoPersonaje();
        partidoPersonaje1.setId(1L);
        PartidoPersonaje partidoPersonaje2 = new PartidoPersonaje();
        partidoPersonaje2.setId(partidoPersonaje1.getId());
        assertThat(partidoPersonaje1).isEqualTo(partidoPersonaje2);
        partidoPersonaje2.setId(2L);
        assertThat(partidoPersonaje1).isNotEqualTo(partidoPersonaje2);
        partidoPersonaje1.setId(null);
        assertThat(partidoPersonaje1).isNotEqualTo(partidoPersonaje2);
    }
}
