package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.Profesion;
import ar.gob.iighi.domain.TipoProfesion;
import ar.gob.iighi.repository.ProfesionRepository;
import ar.gob.iighi.service.ProfesionService;
import ar.gob.iighi.repository.search.ProfesionSearchRepository;
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
 * Test class for the ProfesionResource REST controller.
 *
 * @see ProfesionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class ProfesionResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private ProfesionRepository profesionRepository;

    @Autowired
    private ProfesionService profesionService;

    @Autowired
    private ProfesionSearchRepository profesionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProfesionMockMvc;

    private Profesion profesion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfesionResource profesionResource = new ProfesionResource(profesionService);
        this.restProfesionMockMvc = MockMvcBuilders.standaloneSetup(profesionResource)
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
    public static Profesion createEntity(EntityManager em) {
        Profesion profesion = new Profesion()
            .nombre(DEFAULT_NOMBRE);
        // Add required entity
        TipoProfesion tipoProfesion = TipoProfesionResourceIntTest.createEntity(em);
        em.persist(tipoProfesion);
        em.flush();
        profesion.setTipoProfesion(tipoProfesion);
        return profesion;
    }

    @Before
    public void initTest() {
        profesionSearchRepository.deleteAll();
        profesion = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfesion() throws Exception {
        int databaseSizeBeforeCreate = profesionRepository.findAll().size();

        // Create the Profesion
        restProfesionMockMvc.perform(post("/api/profesions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profesion)))
            .andExpect(status().isCreated());

        // Validate the Profesion in the database
        List<Profesion> profesionList = profesionRepository.findAll();
        assertThat(profesionList).hasSize(databaseSizeBeforeCreate + 1);
        Profesion testProfesion = profesionList.get(profesionList.size() - 1);
        assertThat(testProfesion.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the Profesion in Elasticsearch
        Profesion profesionEs = profesionSearchRepository.findOne(testProfesion.getId());
        assertThat(profesionEs).isEqualToIgnoringGivenFields(testProfesion);
    }

    @Test
    @Transactional
    public void createProfesionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profesionRepository.findAll().size();

        // Create the Profesion with an existing ID
        profesion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfesionMockMvc.perform(post("/api/profesions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profesion)))
            .andExpect(status().isBadRequest());

        // Validate the Profesion in the database
        List<Profesion> profesionList = profesionRepository.findAll();
        assertThat(profesionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = profesionRepository.findAll().size();
        // set the field null
        profesion.setNombre(null);

        // Create the Profesion, which fails.

        restProfesionMockMvc.perform(post("/api/profesions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profesion)))
            .andExpect(status().isBadRequest());

        List<Profesion> profesionList = profesionRepository.findAll();
        assertThat(profesionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfesions() throws Exception {
        // Initialize the database
        profesionRepository.saveAndFlush(profesion);

        // Get all the profesionList
        restProfesionMockMvc.perform(get("/api/profesions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profesion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void getProfesion() throws Exception {
        // Initialize the database
        profesionRepository.saveAndFlush(profesion);

        // Get the profesion
        restProfesionMockMvc.perform(get("/api/profesions/{id}", profesion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(profesion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProfesion() throws Exception {
        // Get the profesion
        restProfesionMockMvc.perform(get("/api/profesions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfesion() throws Exception {
        // Initialize the database
        profesionService.save(profesion);

        int databaseSizeBeforeUpdate = profesionRepository.findAll().size();

        // Update the profesion
        Profesion updatedProfesion = profesionRepository.findOne(profesion.getId());
        // Disconnect from session so that the updates on updatedProfesion are not directly saved in db
        em.detach(updatedProfesion);
        updatedProfesion
            .nombre(UPDATED_NOMBRE);

        restProfesionMockMvc.perform(put("/api/profesions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfesion)))
            .andExpect(status().isOk());

        // Validate the Profesion in the database
        List<Profesion> profesionList = profesionRepository.findAll();
        assertThat(profesionList).hasSize(databaseSizeBeforeUpdate);
        Profesion testProfesion = profesionList.get(profesionList.size() - 1);
        assertThat(testProfesion.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the Profesion in Elasticsearch
        Profesion profesionEs = profesionSearchRepository.findOne(testProfesion.getId());
        assertThat(profesionEs).isEqualToIgnoringGivenFields(testProfesion);
    }

    @Test
    @Transactional
    public void updateNonExistingProfesion() throws Exception {
        int databaseSizeBeforeUpdate = profesionRepository.findAll().size();

        // Create the Profesion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProfesionMockMvc.perform(put("/api/profesions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profesion)))
            .andExpect(status().isCreated());

        // Validate the Profesion in the database
        List<Profesion> profesionList = profesionRepository.findAll();
        assertThat(profesionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProfesion() throws Exception {
        // Initialize the database
        profesionService.save(profesion);

        int databaseSizeBeforeDelete = profesionRepository.findAll().size();

        // Get the profesion
        restProfesionMockMvc.perform(delete("/api/profesions/{id}", profesion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean profesionExistsInEs = profesionSearchRepository.exists(profesion.getId());
        assertThat(profesionExistsInEs).isFalse();

        // Validate the database is empty
        List<Profesion> profesionList = profesionRepository.findAll();
        assertThat(profesionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchProfesion() throws Exception {
        // Initialize the database
        profesionService.save(profesion);

        // Search the profesion
        restProfesionMockMvc.perform(get("/api/_search/profesions?query=id:" + profesion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profesion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Profesion.class);
        Profesion profesion1 = new Profesion();
        profesion1.setId(1L);
        Profesion profesion2 = new Profesion();
        profesion2.setId(profesion1.getId());
        assertThat(profesion1).isEqualTo(profesion2);
        profesion2.setId(2L);
        assertThat(profesion1).isNotEqualTo(profesion2);
        profesion1.setId(null);
        assertThat(profesion1).isNotEqualTo(profesion2);
    }
}
