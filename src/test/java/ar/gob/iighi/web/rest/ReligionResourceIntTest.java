package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.Religion;
import ar.gob.iighi.repository.ReligionRepository;
import ar.gob.iighi.service.ReligionService;
import ar.gob.iighi.repository.search.ReligionSearchRepository;
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
 * Test class for the ReligionResource REST controller.
 *
 * @see ReligionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class ReligionResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private ReligionRepository religionRepository;

    @Autowired
    private ReligionService religionService;

    @Autowired
    private ReligionSearchRepository religionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReligionMockMvc;

    private Religion religion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReligionResource religionResource = new ReligionResource(religionService);
        this.restReligionMockMvc = MockMvcBuilders.standaloneSetup(religionResource)
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
    public static Religion createEntity(EntityManager em) {
        Religion religion = new Religion()
            .nombre(DEFAULT_NOMBRE);
        return religion;
    }

    @Before
    public void initTest() {
        religionSearchRepository.deleteAll();
        religion = createEntity(em);
    }

    @Test
    @Transactional
    public void createReligion() throws Exception {
        int databaseSizeBeforeCreate = religionRepository.findAll().size();

        // Create the Religion
        restReligionMockMvc.perform(post("/api/religions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(religion)))
            .andExpect(status().isCreated());

        // Validate the Religion in the database
        List<Religion> religionList = religionRepository.findAll();
        assertThat(religionList).hasSize(databaseSizeBeforeCreate + 1);
        Religion testReligion = religionList.get(religionList.size() - 1);
        assertThat(testReligion.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the Religion in Elasticsearch
        Religion religionEs = religionSearchRepository.findOne(testReligion.getId());
        assertThat(religionEs).isEqualToIgnoringGivenFields(testReligion);
    }

    @Test
    @Transactional
    public void createReligionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = religionRepository.findAll().size();

        // Create the Religion with an existing ID
        religion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReligionMockMvc.perform(post("/api/religions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(religion)))
            .andExpect(status().isBadRequest());

        // Validate the Religion in the database
        List<Religion> religionList = religionRepository.findAll();
        assertThat(religionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = religionRepository.findAll().size();
        // set the field null
        religion.setNombre(null);

        // Create the Religion, which fails.

        restReligionMockMvc.perform(post("/api/religions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(religion)))
            .andExpect(status().isBadRequest());

        List<Religion> religionList = religionRepository.findAll();
        assertThat(religionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReligions() throws Exception {
        // Initialize the database
        religionRepository.saveAndFlush(religion);

        // Get all the religionList
        restReligionMockMvc.perform(get("/api/religions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(religion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void getReligion() throws Exception {
        // Initialize the database
        religionRepository.saveAndFlush(religion);

        // Get the religion
        restReligionMockMvc.perform(get("/api/religions/{id}", religion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(religion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReligion() throws Exception {
        // Get the religion
        restReligionMockMvc.perform(get("/api/religions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReligion() throws Exception {
        // Initialize the database
        religionService.save(religion);

        int databaseSizeBeforeUpdate = religionRepository.findAll().size();

        // Update the religion
        Religion updatedReligion = religionRepository.findOne(religion.getId());
        // Disconnect from session so that the updates on updatedReligion are not directly saved in db
        em.detach(updatedReligion);
        updatedReligion
            .nombre(UPDATED_NOMBRE);

        restReligionMockMvc.perform(put("/api/religions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReligion)))
            .andExpect(status().isOk());

        // Validate the Religion in the database
        List<Religion> religionList = religionRepository.findAll();
        assertThat(religionList).hasSize(databaseSizeBeforeUpdate);
        Religion testReligion = religionList.get(religionList.size() - 1);
        assertThat(testReligion.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the Religion in Elasticsearch
        Religion religionEs = religionSearchRepository.findOne(testReligion.getId());
        assertThat(religionEs).isEqualToIgnoringGivenFields(testReligion);
    }

    @Test
    @Transactional
    public void updateNonExistingReligion() throws Exception {
        int databaseSizeBeforeUpdate = religionRepository.findAll().size();

        // Create the Religion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReligionMockMvc.perform(put("/api/religions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(religion)))
            .andExpect(status().isCreated());

        // Validate the Religion in the database
        List<Religion> religionList = religionRepository.findAll();
        assertThat(religionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReligion() throws Exception {
        // Initialize the database
        religionService.save(religion);

        int databaseSizeBeforeDelete = religionRepository.findAll().size();

        // Get the religion
        restReligionMockMvc.perform(delete("/api/religions/{id}", religion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean religionExistsInEs = religionSearchRepository.exists(religion.getId());
        assertThat(religionExistsInEs).isFalse();

        // Validate the database is empty
        List<Religion> religionList = religionRepository.findAll();
        assertThat(religionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchReligion() throws Exception {
        // Initialize the database
        religionService.save(religion);

        // Search the religion
        restReligionMockMvc.perform(get("/api/_search/religions?query=id:" + religion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(religion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Religion.class);
        Religion religion1 = new Religion();
        religion1.setId(1L);
        Religion religion2 = new Religion();
        religion2.setId(religion1.getId());
        assertThat(religion1).isEqualTo(religion2);
        religion2.setId(2L);
        assertThat(religion1).isNotEqualTo(religion2);
        religion1.setId(null);
        assertThat(religion1).isNotEqualTo(religion2);
    }
}
