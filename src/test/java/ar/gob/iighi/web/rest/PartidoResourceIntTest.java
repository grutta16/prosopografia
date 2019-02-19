package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.Partido;
import ar.gob.iighi.repository.PartidoRepository;
import ar.gob.iighi.service.PartidoService;
import ar.gob.iighi.repository.search.PartidoSearchRepository;
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
 * Test class for the PartidoResource REST controller.
 *
 * @see PartidoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class PartidoResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_ABREVIACION = "AAAAAAAAAA";
    private static final String UPDATED_ABREVIACION = "BBBBBBBBBB";

    @Autowired
    private PartidoRepository partidoRepository;

    @Autowired
    private PartidoService partidoService;

    @Autowired
    private PartidoSearchRepository partidoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPartidoMockMvc;

    private Partido partido;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartidoResource partidoResource = new PartidoResource(partidoService);
        this.restPartidoMockMvc = MockMvcBuilders.standaloneSetup(partidoResource)
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
    public static Partido createEntity(EntityManager em) {
        Partido partido = new Partido()
            .nombre(DEFAULT_NOMBRE)
            .abreviacion(DEFAULT_ABREVIACION);
        return partido;
    }

    @Before
    public void initTest() {
        partidoSearchRepository.deleteAll();
        partido = createEntity(em);
    }

    @Test
    @Transactional
    public void createPartido() throws Exception {
        int databaseSizeBeforeCreate = partidoRepository.findAll().size();

        // Create the Partido
        restPartidoMockMvc.perform(post("/api/partidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partido)))
            .andExpect(status().isCreated());

        // Validate the Partido in the database
        List<Partido> partidoList = partidoRepository.findAll();
        assertThat(partidoList).hasSize(databaseSizeBeforeCreate + 1);
        Partido testPartido = partidoList.get(partidoList.size() - 1);
        assertThat(testPartido.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPartido.getAbreviacion()).isEqualTo(DEFAULT_ABREVIACION);

        // Validate the Partido in Elasticsearch
        Partido partidoEs = partidoSearchRepository.findOne(testPartido.getId());
        assertThat(partidoEs).isEqualToIgnoringGivenFields(testPartido);
    }

    @Test
    @Transactional
    public void createPartidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partidoRepository.findAll().size();

        // Create the Partido with an existing ID
        partido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartidoMockMvc.perform(post("/api/partidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partido)))
            .andExpect(status().isBadRequest());

        // Validate the Partido in the database
        List<Partido> partidoList = partidoRepository.findAll();
        assertThat(partidoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = partidoRepository.findAll().size();
        // set the field null
        partido.setNombre(null);

        // Create the Partido, which fails.

        restPartidoMockMvc.perform(post("/api/partidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partido)))
            .andExpect(status().isBadRequest());

        List<Partido> partidoList = partidoRepository.findAll();
        assertThat(partidoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPartidos() throws Exception {
        // Initialize the database
        partidoRepository.saveAndFlush(partido);

        // Get all the partidoList
        restPartidoMockMvc.perform(get("/api/partidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partido.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].abreviacion").value(hasItem(DEFAULT_ABREVIACION.toString())));
    }

    @Test
    @Transactional
    public void getPartido() throws Exception {
        // Initialize the database
        partidoRepository.saveAndFlush(partido);

        // Get the partido
        restPartidoMockMvc.perform(get("/api/partidos/{id}", partido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(partido.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.abreviacion").value(DEFAULT_ABREVIACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPartido() throws Exception {
        // Get the partido
        restPartidoMockMvc.perform(get("/api/partidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePartido() throws Exception {
        // Initialize the database
        partidoService.save(partido);

        int databaseSizeBeforeUpdate = partidoRepository.findAll().size();

        // Update the partido
        Partido updatedPartido = partidoRepository.findOne(partido.getId());
        // Disconnect from session so that the updates on updatedPartido are not directly saved in db
        em.detach(updatedPartido);
        updatedPartido
            .nombre(UPDATED_NOMBRE)
            .abreviacion(UPDATED_ABREVIACION);

        restPartidoMockMvc.perform(put("/api/partidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPartido)))
            .andExpect(status().isOk());

        // Validate the Partido in the database
        List<Partido> partidoList = partidoRepository.findAll();
        assertThat(partidoList).hasSize(databaseSizeBeforeUpdate);
        Partido testPartido = partidoList.get(partidoList.size() - 1);
        assertThat(testPartido.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPartido.getAbreviacion()).isEqualTo(UPDATED_ABREVIACION);

        // Validate the Partido in Elasticsearch
        Partido partidoEs = partidoSearchRepository.findOne(testPartido.getId());
        assertThat(partidoEs).isEqualToIgnoringGivenFields(testPartido);
    }

    @Test
    @Transactional
    public void updateNonExistingPartido() throws Exception {
        int databaseSizeBeforeUpdate = partidoRepository.findAll().size();

        // Create the Partido

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPartidoMockMvc.perform(put("/api/partidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partido)))
            .andExpect(status().isCreated());

        // Validate the Partido in the database
        List<Partido> partidoList = partidoRepository.findAll();
        assertThat(partidoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePartido() throws Exception {
        // Initialize the database
        partidoService.save(partido);

        int databaseSizeBeforeDelete = partidoRepository.findAll().size();

        // Get the partido
        restPartidoMockMvc.perform(delete("/api/partidos/{id}", partido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean partidoExistsInEs = partidoSearchRepository.exists(partido.getId());
        assertThat(partidoExistsInEs).isFalse();

        // Validate the database is empty
        List<Partido> partidoList = partidoRepository.findAll();
        assertThat(partidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPartido() throws Exception {
        // Initialize the database
        partidoService.save(partido);

        // Search the partido
        restPartidoMockMvc.perform(get("/api/_search/partidos?query=id:" + partido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partido.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].abreviacion").value(hasItem(DEFAULT_ABREVIACION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Partido.class);
        Partido partido1 = new Partido();
        partido1.setId(1L);
        Partido partido2 = new Partido();
        partido2.setId(partido1.getId());
        assertThat(partido1).isEqualTo(partido2);
        partido2.setId(2L);
        assertThat(partido1).isNotEqualTo(partido2);
        partido1.setId(null);
        assertThat(partido1).isNotEqualTo(partido2);
    }
}
