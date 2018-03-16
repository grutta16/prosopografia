package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.Candidatura;
import ar.gob.iighi.domain.Eleccion;
import ar.gob.iighi.domain.Seccion;
import ar.gob.iighi.repository.CandidaturaRepository;
import ar.gob.iighi.service.CandidaturaService;
import ar.gob.iighi.repository.search.CandidaturaSearchRepository;
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
 * Test class for the CandidaturaResource REST controller.
 *
 * @see CandidaturaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class CandidaturaResourceIntTest {

    private static final Boolean DEFAULT_ES_SUPLENTE = false;
    private static final Boolean UPDATED_ES_SUPLENTE = true;

    private static final Boolean DEFAULT_RESULTO_ELECTO = false;
    private static final Boolean UPDATED_RESULTO_ELECTO = true;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private CandidaturaRepository candidaturaRepository;

    @Autowired
    private CandidaturaService candidaturaService;

    @Autowired
    private CandidaturaSearchRepository candidaturaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCandidaturaMockMvc;

    private Candidatura candidatura;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CandidaturaResource candidaturaResource = new CandidaturaResource(candidaturaService);
        this.restCandidaturaMockMvc = MockMvcBuilders.standaloneSetup(candidaturaResource)
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
    public static Candidatura createEntity(EntityManager em) {
        Candidatura candidatura = new Candidatura()
            .esSuplente(DEFAULT_ES_SUPLENTE)
            .resultoElecto(DEFAULT_RESULTO_ELECTO)
            .observaciones(DEFAULT_OBSERVACIONES);
        // Add required entity
        Eleccion eleccion = EleccionResourceIntTest.createEntity(em);
        em.persist(eleccion);
        em.flush();
        candidatura.setEleccion(eleccion);
        // Add required entity
        Seccion seccion = SeccionResourceIntTest.createEntity(em);
        em.persist(seccion);
        em.flush();
        candidatura.setSeccion(seccion);
        return candidatura;
    }

    @Before
    public void initTest() {
        candidaturaSearchRepository.deleteAll();
        candidatura = createEntity(em);
    }

    @Test
    @Transactional
    public void createCandidatura() throws Exception {
        int databaseSizeBeforeCreate = candidaturaRepository.findAll().size();

        // Create the Candidatura
        restCandidaturaMockMvc.perform(post("/api/candidaturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(candidatura)))
            .andExpect(status().isCreated());

        // Validate the Candidatura in the database
        List<Candidatura> candidaturaList = candidaturaRepository.findAll();
        assertThat(candidaturaList).hasSize(databaseSizeBeforeCreate + 1);
        Candidatura testCandidatura = candidaturaList.get(candidaturaList.size() - 1);
        assertThat(testCandidatura.isEsSuplente()).isEqualTo(DEFAULT_ES_SUPLENTE);
        assertThat(testCandidatura.isResultoElecto()).isEqualTo(DEFAULT_RESULTO_ELECTO);
        assertThat(testCandidatura.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);

        // Validate the Candidatura in Elasticsearch
        Candidatura candidaturaEs = candidaturaSearchRepository.findOne(testCandidatura.getId());
        assertThat(candidaturaEs).isEqualToIgnoringGivenFields(testCandidatura);
    }

    @Test
    @Transactional
    public void createCandidaturaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = candidaturaRepository.findAll().size();

        // Create the Candidatura with an existing ID
        candidatura.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCandidaturaMockMvc.perform(post("/api/candidaturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(candidatura)))
            .andExpect(status().isBadRequest());

        // Validate the Candidatura in the database
        List<Candidatura> candidaturaList = candidaturaRepository.findAll();
        assertThat(candidaturaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCandidaturas() throws Exception {
        // Initialize the database
        candidaturaRepository.saveAndFlush(candidatura);

        // Get all the candidaturaList
        restCandidaturaMockMvc.perform(get("/api/candidaturas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(candidatura.getId().intValue())))
            .andExpect(jsonPath("$.[*].esSuplente").value(hasItem(DEFAULT_ES_SUPLENTE.booleanValue())))
            .andExpect(jsonPath("$.[*].resultoElecto").value(hasItem(DEFAULT_RESULTO_ELECTO.booleanValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void getCandidatura() throws Exception {
        // Initialize the database
        candidaturaRepository.saveAndFlush(candidatura);

        // Get the candidatura
        restCandidaturaMockMvc.perform(get("/api/candidaturas/{id}", candidatura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(candidatura.getId().intValue()))
            .andExpect(jsonPath("$.esSuplente").value(DEFAULT_ES_SUPLENTE.booleanValue()))
            .andExpect(jsonPath("$.resultoElecto").value(DEFAULT_RESULTO_ELECTO.booleanValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCandidatura() throws Exception {
        // Get the candidatura
        restCandidaturaMockMvc.perform(get("/api/candidaturas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCandidatura() throws Exception {
        // Initialize the database
        candidaturaService.save(candidatura);

        int databaseSizeBeforeUpdate = candidaturaRepository.findAll().size();

        // Update the candidatura
        Candidatura updatedCandidatura = candidaturaRepository.findOne(candidatura.getId());
        // Disconnect from session so that the updates on updatedCandidatura are not directly saved in db
        em.detach(updatedCandidatura);
        updatedCandidatura
            .esSuplente(UPDATED_ES_SUPLENTE)
            .resultoElecto(UPDATED_RESULTO_ELECTO)
            .observaciones(UPDATED_OBSERVACIONES);

        restCandidaturaMockMvc.perform(put("/api/candidaturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCandidatura)))
            .andExpect(status().isOk());

        // Validate the Candidatura in the database
        List<Candidatura> candidaturaList = candidaturaRepository.findAll();
        assertThat(candidaturaList).hasSize(databaseSizeBeforeUpdate);
        Candidatura testCandidatura = candidaturaList.get(candidaturaList.size() - 1);
        assertThat(testCandidatura.isEsSuplente()).isEqualTo(UPDATED_ES_SUPLENTE);
        assertThat(testCandidatura.isResultoElecto()).isEqualTo(UPDATED_RESULTO_ELECTO);
        assertThat(testCandidatura.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);

        // Validate the Candidatura in Elasticsearch
        Candidatura candidaturaEs = candidaturaSearchRepository.findOne(testCandidatura.getId());
        assertThat(candidaturaEs).isEqualToIgnoringGivenFields(testCandidatura);
    }

    @Test
    @Transactional
    public void updateNonExistingCandidatura() throws Exception {
        int databaseSizeBeforeUpdate = candidaturaRepository.findAll().size();

        // Create the Candidatura

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCandidaturaMockMvc.perform(put("/api/candidaturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(candidatura)))
            .andExpect(status().isCreated());

        // Validate the Candidatura in the database
        List<Candidatura> candidaturaList = candidaturaRepository.findAll();
        assertThat(candidaturaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCandidatura() throws Exception {
        // Initialize the database
        candidaturaService.save(candidatura);

        int databaseSizeBeforeDelete = candidaturaRepository.findAll().size();

        // Get the candidatura
        restCandidaturaMockMvc.perform(delete("/api/candidaturas/{id}", candidatura.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean candidaturaExistsInEs = candidaturaSearchRepository.exists(candidatura.getId());
        assertThat(candidaturaExistsInEs).isFalse();

        // Validate the database is empty
        List<Candidatura> candidaturaList = candidaturaRepository.findAll();
        assertThat(candidaturaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCandidatura() throws Exception {
        // Initialize the database
        candidaturaService.save(candidatura);

        // Search the candidatura
        restCandidaturaMockMvc.perform(get("/api/_search/candidaturas?query=id:" + candidatura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(candidatura.getId().intValue())))
            .andExpect(jsonPath("$.[*].esSuplente").value(hasItem(DEFAULT_ES_SUPLENTE.booleanValue())))
            .andExpect(jsonPath("$.[*].resultoElecto").value(hasItem(DEFAULT_RESULTO_ELECTO.booleanValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Candidatura.class);
        Candidatura candidatura1 = new Candidatura();
        candidatura1.setId(1L);
        Candidatura candidatura2 = new Candidatura();
        candidatura2.setId(candidatura1.getId());
        assertThat(candidatura1).isEqualTo(candidatura2);
        candidatura2.setId(2L);
        assertThat(candidatura1).isNotEqualTo(candidatura2);
        candidatura1.setId(null);
        assertThat(candidatura1).isNotEqualTo(candidatura2);
    }
}
