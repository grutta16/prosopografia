package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.RelacionFamiliar;
import ar.gob.iighi.repository.RelacionFamiliarRepository;
import ar.gob.iighi.service.RelacionFamiliarService;
import ar.gob.iighi.repository.search.RelacionFamiliarSearchRepository;
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
 * Test class for the RelacionFamiliarResource REST controller.
 *
 * @see RelacionFamiliarResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class RelacionFamiliarResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private RelacionFamiliarRepository relacionFamiliarRepository;

    @Autowired
    private RelacionFamiliarService relacionFamiliarService;

    @Autowired
    private RelacionFamiliarSearchRepository relacionFamiliarSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRelacionFamiliarMockMvc;

    private RelacionFamiliar relacionFamiliar;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RelacionFamiliarResource relacionFamiliarResource = new RelacionFamiliarResource(relacionFamiliarService);
        this.restRelacionFamiliarMockMvc = MockMvcBuilders.standaloneSetup(relacionFamiliarResource)
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
    public static RelacionFamiliar createEntity(EntityManager em) {
        RelacionFamiliar relacionFamiliar = new RelacionFamiliar()
            .nombre(DEFAULT_NOMBRE);
        return relacionFamiliar;
    }

    @Before
    public void initTest() {
        relacionFamiliarSearchRepository.deleteAll();
        relacionFamiliar = createEntity(em);
    }

    @Test
    @Transactional
    public void createRelacionFamiliar() throws Exception {
        int databaseSizeBeforeCreate = relacionFamiliarRepository.findAll().size();

        // Create the RelacionFamiliar
        restRelacionFamiliarMockMvc.perform(post("/api/relacion-familiars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relacionFamiliar)))
            .andExpect(status().isCreated());

        // Validate the RelacionFamiliar in the database
        List<RelacionFamiliar> relacionFamiliarList = relacionFamiliarRepository.findAll();
        assertThat(relacionFamiliarList).hasSize(databaseSizeBeforeCreate + 1);
        RelacionFamiliar testRelacionFamiliar = relacionFamiliarList.get(relacionFamiliarList.size() - 1);
        assertThat(testRelacionFamiliar.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the RelacionFamiliar in Elasticsearch
        RelacionFamiliar relacionFamiliarEs = relacionFamiliarSearchRepository.findOne(testRelacionFamiliar.getId());
        assertThat(relacionFamiliarEs).isEqualToIgnoringGivenFields(testRelacionFamiliar);
    }

    @Test
    @Transactional
    public void createRelacionFamiliarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = relacionFamiliarRepository.findAll().size();

        // Create the RelacionFamiliar with an existing ID
        relacionFamiliar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRelacionFamiliarMockMvc.perform(post("/api/relacion-familiars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relacionFamiliar)))
            .andExpect(status().isBadRequest());

        // Validate the RelacionFamiliar in the database
        List<RelacionFamiliar> relacionFamiliarList = relacionFamiliarRepository.findAll();
        assertThat(relacionFamiliarList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = relacionFamiliarRepository.findAll().size();
        // set the field null
        relacionFamiliar.setNombre(null);

        // Create the RelacionFamiliar, which fails.

        restRelacionFamiliarMockMvc.perform(post("/api/relacion-familiars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relacionFamiliar)))
            .andExpect(status().isBadRequest());

        List<RelacionFamiliar> relacionFamiliarList = relacionFamiliarRepository.findAll();
        assertThat(relacionFamiliarList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRelacionFamiliars() throws Exception {
        // Initialize the database
        relacionFamiliarRepository.saveAndFlush(relacionFamiliar);

        // Get all the relacionFamiliarList
        restRelacionFamiliarMockMvc.perform(get("/api/relacion-familiars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(relacionFamiliar.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void getRelacionFamiliar() throws Exception {
        // Initialize the database
        relacionFamiliarRepository.saveAndFlush(relacionFamiliar);

        // Get the relacionFamiliar
        restRelacionFamiliarMockMvc.perform(get("/api/relacion-familiars/{id}", relacionFamiliar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(relacionFamiliar.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRelacionFamiliar() throws Exception {
        // Get the relacionFamiliar
        restRelacionFamiliarMockMvc.perform(get("/api/relacion-familiars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRelacionFamiliar() throws Exception {
        // Initialize the database
        relacionFamiliarService.save(relacionFamiliar);

        int databaseSizeBeforeUpdate = relacionFamiliarRepository.findAll().size();

        // Update the relacionFamiliar
        RelacionFamiliar updatedRelacionFamiliar = relacionFamiliarRepository.findOne(relacionFamiliar.getId());
        // Disconnect from session so that the updates on updatedRelacionFamiliar are not directly saved in db
        em.detach(updatedRelacionFamiliar);
        updatedRelacionFamiliar
            .nombre(UPDATED_NOMBRE);

        restRelacionFamiliarMockMvc.perform(put("/api/relacion-familiars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRelacionFamiliar)))
            .andExpect(status().isOk());

        // Validate the RelacionFamiliar in the database
        List<RelacionFamiliar> relacionFamiliarList = relacionFamiliarRepository.findAll();
        assertThat(relacionFamiliarList).hasSize(databaseSizeBeforeUpdate);
        RelacionFamiliar testRelacionFamiliar = relacionFamiliarList.get(relacionFamiliarList.size() - 1);
        assertThat(testRelacionFamiliar.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the RelacionFamiliar in Elasticsearch
        RelacionFamiliar relacionFamiliarEs = relacionFamiliarSearchRepository.findOne(testRelacionFamiliar.getId());
        assertThat(relacionFamiliarEs).isEqualToIgnoringGivenFields(testRelacionFamiliar);
    }

    @Test
    @Transactional
    public void updateNonExistingRelacionFamiliar() throws Exception {
        int databaseSizeBeforeUpdate = relacionFamiliarRepository.findAll().size();

        // Create the RelacionFamiliar

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRelacionFamiliarMockMvc.perform(put("/api/relacion-familiars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relacionFamiliar)))
            .andExpect(status().isCreated());

        // Validate the RelacionFamiliar in the database
        List<RelacionFamiliar> relacionFamiliarList = relacionFamiliarRepository.findAll();
        assertThat(relacionFamiliarList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRelacionFamiliar() throws Exception {
        // Initialize the database
        relacionFamiliarService.save(relacionFamiliar);

        int databaseSizeBeforeDelete = relacionFamiliarRepository.findAll().size();

        // Get the relacionFamiliar
        restRelacionFamiliarMockMvc.perform(delete("/api/relacion-familiars/{id}", relacionFamiliar.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean relacionFamiliarExistsInEs = relacionFamiliarSearchRepository.exists(relacionFamiliar.getId());
        assertThat(relacionFamiliarExistsInEs).isFalse();

        // Validate the database is empty
        List<RelacionFamiliar> relacionFamiliarList = relacionFamiliarRepository.findAll();
        assertThat(relacionFamiliarList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchRelacionFamiliar() throws Exception {
        // Initialize the database
        relacionFamiliarService.save(relacionFamiliar);

        // Search the relacionFamiliar
        restRelacionFamiliarMockMvc.perform(get("/api/_search/relacion-familiars?query=id:" + relacionFamiliar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(relacionFamiliar.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RelacionFamiliar.class);
        RelacionFamiliar relacionFamiliar1 = new RelacionFamiliar();
        relacionFamiliar1.setId(1L);
        RelacionFamiliar relacionFamiliar2 = new RelacionFamiliar();
        relacionFamiliar2.setId(relacionFamiliar1.getId());
        assertThat(relacionFamiliar1).isEqualTo(relacionFamiliar2);
        relacionFamiliar2.setId(2L);
        assertThat(relacionFamiliar1).isNotEqualTo(relacionFamiliar2);
        relacionFamiliar1.setId(null);
        assertThat(relacionFamiliar1).isNotEqualTo(relacionFamiliar2);
    }
}
