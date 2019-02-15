package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.TipoProfesion;
import ar.gob.iighi.repository.TipoProfesionRepository;
import ar.gob.iighi.service.TipoProfesionService;
import ar.gob.iighi.repository.search.TipoProfesionSearchRepository;
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
 * Test class for the TipoProfesionResource REST controller.
 *
 * @see TipoProfesionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class TipoProfesionResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private TipoProfesionRepository tipoProfesionRepository;

    @Autowired
    private TipoProfesionService tipoProfesionService;

    @Autowired
    private TipoProfesionSearchRepository tipoProfesionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoProfesionMockMvc;

    private TipoProfesion tipoProfesion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoProfesionResource tipoProfesionResource = new TipoProfesionResource(tipoProfesionService);
        this.restTipoProfesionMockMvc = MockMvcBuilders.standaloneSetup(tipoProfesionResource)
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
    public static TipoProfesion createEntity(EntityManager em) {
        TipoProfesion tipoProfesion = new TipoProfesion()
            .nombre(DEFAULT_NOMBRE);
        return tipoProfesion;
    }

    @Before
    public void initTest() {
        tipoProfesionSearchRepository.deleteAll();
        tipoProfesion = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoProfesion() throws Exception {
        int databaseSizeBeforeCreate = tipoProfesionRepository.findAll().size();

        // Create the TipoProfesion
        restTipoProfesionMockMvc.perform(post("/api/tipo-profesions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProfesion)))
            .andExpect(status().isCreated());

        // Validate the TipoProfesion in the database
        List<TipoProfesion> tipoProfesionList = tipoProfesionRepository.findAll();
        assertThat(tipoProfesionList).hasSize(databaseSizeBeforeCreate + 1);
        TipoProfesion testTipoProfesion = tipoProfesionList.get(tipoProfesionList.size() - 1);
        assertThat(testTipoProfesion.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the TipoProfesion in Elasticsearch
        TipoProfesion tipoProfesionEs = tipoProfesionSearchRepository.findOne(testTipoProfesion.getId());
        assertThat(tipoProfesionEs).isEqualToIgnoringGivenFields(testTipoProfesion);
    }

    @Test
    @Transactional
    public void createTipoProfesionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoProfesionRepository.findAll().size();

        // Create the TipoProfesion with an existing ID
        tipoProfesion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoProfesionMockMvc.perform(post("/api/tipo-profesions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProfesion)))
            .andExpect(status().isBadRequest());

        // Validate the TipoProfesion in the database
        List<TipoProfesion> tipoProfesionList = tipoProfesionRepository.findAll();
        assertThat(tipoProfesionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoProfesionRepository.findAll().size();
        // set the field null
        tipoProfesion.setNombre(null);

        // Create the TipoProfesion, which fails.

        restTipoProfesionMockMvc.perform(post("/api/tipo-profesions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProfesion)))
            .andExpect(status().isBadRequest());

        List<TipoProfesion> tipoProfesionList = tipoProfesionRepository.findAll();
        assertThat(tipoProfesionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoProfesions() throws Exception {
        // Initialize the database
        tipoProfesionRepository.saveAndFlush(tipoProfesion);

        // Get all the tipoProfesionList
        restTipoProfesionMockMvc.perform(get("/api/tipo-profesions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoProfesion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void getTipoProfesion() throws Exception {
        // Initialize the database
        tipoProfesionRepository.saveAndFlush(tipoProfesion);

        // Get the tipoProfesion
        restTipoProfesionMockMvc.perform(get("/api/tipo-profesions/{id}", tipoProfesion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoProfesion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoProfesion() throws Exception {
        // Get the tipoProfesion
        restTipoProfesionMockMvc.perform(get("/api/tipo-profesions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoProfesion() throws Exception {
        // Initialize the database
        tipoProfesionService.save(tipoProfesion);

        int databaseSizeBeforeUpdate = tipoProfesionRepository.findAll().size();

        // Update the tipoProfesion
        TipoProfesion updatedTipoProfesion = tipoProfesionRepository.findOne(tipoProfesion.getId());
        // Disconnect from session so that the updates on updatedTipoProfesion are not directly saved in db
        em.detach(updatedTipoProfesion);
        updatedTipoProfesion
            .nombre(UPDATED_NOMBRE);

        restTipoProfesionMockMvc.perform(put("/api/tipo-profesions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoProfesion)))
            .andExpect(status().isOk());

        // Validate the TipoProfesion in the database
        List<TipoProfesion> tipoProfesionList = tipoProfesionRepository.findAll();
        assertThat(tipoProfesionList).hasSize(databaseSizeBeforeUpdate);
        TipoProfesion testTipoProfesion = tipoProfesionList.get(tipoProfesionList.size() - 1);
        assertThat(testTipoProfesion.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the TipoProfesion in Elasticsearch
        TipoProfesion tipoProfesionEs = tipoProfesionSearchRepository.findOne(testTipoProfesion.getId());
        assertThat(tipoProfesionEs).isEqualToIgnoringGivenFields(testTipoProfesion);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoProfesion() throws Exception {
        int databaseSizeBeforeUpdate = tipoProfesionRepository.findAll().size();

        // Create the TipoProfesion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoProfesionMockMvc.perform(put("/api/tipo-profesions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoProfesion)))
            .andExpect(status().isCreated());

        // Validate the TipoProfesion in the database
        List<TipoProfesion> tipoProfesionList = tipoProfesionRepository.findAll();
        assertThat(tipoProfesionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTipoProfesion() throws Exception {
        // Initialize the database
        tipoProfesionService.save(tipoProfesion);

        int databaseSizeBeforeDelete = tipoProfesionRepository.findAll().size();

        // Get the tipoProfesion
        restTipoProfesionMockMvc.perform(delete("/api/tipo-profesions/{id}", tipoProfesion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tipoProfesionExistsInEs = tipoProfesionSearchRepository.exists(tipoProfesion.getId());
        assertThat(tipoProfesionExistsInEs).isFalse();

        // Validate the database is empty
        List<TipoProfesion> tipoProfesionList = tipoProfesionRepository.findAll();
        assertThat(tipoProfesionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTipoProfesion() throws Exception {
        // Initialize the database
        tipoProfesionService.save(tipoProfesion);

        // Search the tipoProfesion
        restTipoProfesionMockMvc.perform(get("/api/_search/tipo-profesions?query=id:" + tipoProfesion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoProfesion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoProfesion.class);
        TipoProfesion tipoProfesion1 = new TipoProfesion();
        tipoProfesion1.setId(1L);
        TipoProfesion tipoProfesion2 = new TipoProfesion();
        tipoProfesion2.setId(tipoProfesion1.getId());
        assertThat(tipoProfesion1).isEqualTo(tipoProfesion2);
        tipoProfesion2.setId(2L);
        assertThat(tipoProfesion1).isNotEqualTo(tipoProfesion2);
        tipoProfesion1.setId(null);
        assertThat(tipoProfesion1).isNotEqualTo(tipoProfesion2);
    }
}
