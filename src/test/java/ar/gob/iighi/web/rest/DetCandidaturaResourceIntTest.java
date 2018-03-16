package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.DetCandidatura;
import ar.gob.iighi.domain.Candidatura;
import ar.gob.iighi.repository.DetCandidaturaRepository;
import ar.gob.iighi.service.DetCandidaturaService;
import ar.gob.iighi.repository.search.DetCandidaturaSearchRepository;
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
 * Test class for the DetCandidaturaResource REST controller.
 *
 * @see DetCandidaturaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class DetCandidaturaResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private DetCandidaturaRepository detCandidaturaRepository;

    @Autowired
    private DetCandidaturaService detCandidaturaService;

    @Autowired
    private DetCandidaturaSearchRepository detCandidaturaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDetCandidaturaMockMvc;

    private DetCandidatura detCandidatura;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DetCandidaturaResource detCandidaturaResource = new DetCandidaturaResource(detCandidaturaService);
        this.restDetCandidaturaMockMvc = MockMvcBuilders.standaloneSetup(detCandidaturaResource)
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
    public static DetCandidatura createEntity(EntityManager em) {
        DetCandidatura detCandidatura = new DetCandidatura()
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN)
            .observaciones(DEFAULT_OBSERVACIONES);
        // Add required entity
        Candidatura candidatura = CandidaturaResourceIntTest.createEntity(em);
        em.persist(candidatura);
        em.flush();
        detCandidatura.setCandidatura(candidatura);
        return detCandidatura;
    }

    @Before
    public void initTest() {
        detCandidaturaSearchRepository.deleteAll();
        detCandidatura = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetCandidatura() throws Exception {
        int databaseSizeBeforeCreate = detCandidaturaRepository.findAll().size();

        // Create the DetCandidatura
        restDetCandidaturaMockMvc.perform(post("/api/det-candidaturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detCandidatura)))
            .andExpect(status().isCreated());

        // Validate the DetCandidatura in the database
        List<DetCandidatura> detCandidaturaList = detCandidaturaRepository.findAll();
        assertThat(detCandidaturaList).hasSize(databaseSizeBeforeCreate + 1);
        DetCandidatura testDetCandidatura = detCandidaturaList.get(detCandidaturaList.size() - 1);
        assertThat(testDetCandidatura.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testDetCandidatura.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
        assertThat(testDetCandidatura.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);

        // Validate the DetCandidatura in Elasticsearch
        DetCandidatura detCandidaturaEs = detCandidaturaSearchRepository.findOne(testDetCandidatura.getId());
        assertThat(detCandidaturaEs).isEqualToIgnoringGivenFields(testDetCandidatura);
    }

    @Test
    @Transactional
    public void createDetCandidaturaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detCandidaturaRepository.findAll().size();

        // Create the DetCandidatura with an existing ID
        detCandidatura.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetCandidaturaMockMvc.perform(post("/api/det-candidaturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detCandidatura)))
            .andExpect(status().isBadRequest());

        // Validate the DetCandidatura in the database
        List<DetCandidatura> detCandidaturaList = detCandidaturaRepository.findAll();
        assertThat(detCandidaturaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDetCandidaturas() throws Exception {
        // Initialize the database
        detCandidaturaRepository.saveAndFlush(detCandidatura);

        // Get all the detCandidaturaList
        restDetCandidaturaMockMvc.perform(get("/api/det-candidaturas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detCandidatura.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void getDetCandidatura() throws Exception {
        // Initialize the database
        detCandidaturaRepository.saveAndFlush(detCandidatura);

        // Get the detCandidatura
        restDetCandidaturaMockMvc.perform(get("/api/det-candidaturas/{id}", detCandidatura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(detCandidatura.getId().intValue()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDetCandidatura() throws Exception {
        // Get the detCandidatura
        restDetCandidaturaMockMvc.perform(get("/api/det-candidaturas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetCandidatura() throws Exception {
        // Initialize the database
        detCandidaturaService.save(detCandidatura);

        int databaseSizeBeforeUpdate = detCandidaturaRepository.findAll().size();

        // Update the detCandidatura
        DetCandidatura updatedDetCandidatura = detCandidaturaRepository.findOne(detCandidatura.getId());
        // Disconnect from session so that the updates on updatedDetCandidatura are not directly saved in db
        em.detach(updatedDetCandidatura);
        updatedDetCandidatura
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .observaciones(UPDATED_OBSERVACIONES);

        restDetCandidaturaMockMvc.perform(put("/api/det-candidaturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetCandidatura)))
            .andExpect(status().isOk());

        // Validate the DetCandidatura in the database
        List<DetCandidatura> detCandidaturaList = detCandidaturaRepository.findAll();
        assertThat(detCandidaturaList).hasSize(databaseSizeBeforeUpdate);
        DetCandidatura testDetCandidatura = detCandidaturaList.get(detCandidaturaList.size() - 1);
        assertThat(testDetCandidatura.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testDetCandidatura.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
        assertThat(testDetCandidatura.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);

        // Validate the DetCandidatura in Elasticsearch
        DetCandidatura detCandidaturaEs = detCandidaturaSearchRepository.findOne(testDetCandidatura.getId());
        assertThat(detCandidaturaEs).isEqualToIgnoringGivenFields(testDetCandidatura);
    }

    @Test
    @Transactional
    public void updateNonExistingDetCandidatura() throws Exception {
        int databaseSizeBeforeUpdate = detCandidaturaRepository.findAll().size();

        // Create the DetCandidatura

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDetCandidaturaMockMvc.perform(put("/api/det-candidaturas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detCandidatura)))
            .andExpect(status().isCreated());

        // Validate the DetCandidatura in the database
        List<DetCandidatura> detCandidaturaList = detCandidaturaRepository.findAll();
        assertThat(detCandidaturaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDetCandidatura() throws Exception {
        // Initialize the database
        detCandidaturaService.save(detCandidatura);

        int databaseSizeBeforeDelete = detCandidaturaRepository.findAll().size();

        // Get the detCandidatura
        restDetCandidaturaMockMvc.perform(delete("/api/det-candidaturas/{id}", detCandidatura.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean detCandidaturaExistsInEs = detCandidaturaSearchRepository.exists(detCandidatura.getId());
        assertThat(detCandidaturaExistsInEs).isFalse();

        // Validate the database is empty
        List<DetCandidatura> detCandidaturaList = detCandidaturaRepository.findAll();
        assertThat(detCandidaturaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchDetCandidatura() throws Exception {
        // Initialize the database
        detCandidaturaService.save(detCandidatura);

        // Search the detCandidatura
        restDetCandidaturaMockMvc.perform(get("/api/_search/det-candidaturas?query=id:" + detCandidatura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detCandidatura.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetCandidatura.class);
        DetCandidatura detCandidatura1 = new DetCandidatura();
        detCandidatura1.setId(1L);
        DetCandidatura detCandidatura2 = new DetCandidatura();
        detCandidatura2.setId(detCandidatura1.getId());
        assertThat(detCandidatura1).isEqualTo(detCandidatura2);
        detCandidatura2.setId(2L);
        assertThat(detCandidatura1).isNotEqualTo(detCandidatura2);
        detCandidatura1.setId(null);
        assertThat(detCandidatura1).isNotEqualTo(detCandidatura2);
    }
}
