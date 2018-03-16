package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.Asociacion;
import ar.gob.iighi.repository.AsociacionRepository;
import ar.gob.iighi.service.AsociacionService;
import ar.gob.iighi.repository.search.AsociacionSearchRepository;
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
 * Test class for the AsociacionResource REST controller.
 *
 * @see AsociacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class AsociacionResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private AsociacionRepository asociacionRepository;

    @Autowired
    private AsociacionService asociacionService;

    @Autowired
    private AsociacionSearchRepository asociacionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAsociacionMockMvc;

    private Asociacion asociacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AsociacionResource asociacionResource = new AsociacionResource(asociacionService);
        this.restAsociacionMockMvc = MockMvcBuilders.standaloneSetup(asociacionResource)
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
    public static Asociacion createEntity(EntityManager em) {
        Asociacion asociacion = new Asociacion()
            .nombre(DEFAULT_NOMBRE);
        return asociacion;
    }

    @Before
    public void initTest() {
        asociacionSearchRepository.deleteAll();
        asociacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsociacion() throws Exception {
        int databaseSizeBeforeCreate = asociacionRepository.findAll().size();

        // Create the Asociacion
        restAsociacionMockMvc.perform(post("/api/asociacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociacion)))
            .andExpect(status().isCreated());

        // Validate the Asociacion in the database
        List<Asociacion> asociacionList = asociacionRepository.findAll();
        assertThat(asociacionList).hasSize(databaseSizeBeforeCreate + 1);
        Asociacion testAsociacion = asociacionList.get(asociacionList.size() - 1);
        assertThat(testAsociacion.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the Asociacion in Elasticsearch
        Asociacion asociacionEs = asociacionSearchRepository.findOne(testAsociacion.getId());
        assertThat(asociacionEs).isEqualToIgnoringGivenFields(testAsociacion);
    }

    @Test
    @Transactional
    public void createAsociacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asociacionRepository.findAll().size();

        // Create the Asociacion with an existing ID
        asociacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsociacionMockMvc.perform(post("/api/asociacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociacion)))
            .andExpect(status().isBadRequest());

        // Validate the Asociacion in the database
        List<Asociacion> asociacionList = asociacionRepository.findAll();
        assertThat(asociacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = asociacionRepository.findAll().size();
        // set the field null
        asociacion.setNombre(null);

        // Create the Asociacion, which fails.

        restAsociacionMockMvc.perform(post("/api/asociacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociacion)))
            .andExpect(status().isBadRequest());

        List<Asociacion> asociacionList = asociacionRepository.findAll();
        assertThat(asociacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAsociacions() throws Exception {
        // Initialize the database
        asociacionRepository.saveAndFlush(asociacion);

        // Get all the asociacionList
        restAsociacionMockMvc.perform(get("/api/asociacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asociacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void getAsociacion() throws Exception {
        // Initialize the database
        asociacionRepository.saveAndFlush(asociacion);

        // Get the asociacion
        restAsociacionMockMvc.perform(get("/api/asociacions/{id}", asociacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(asociacion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAsociacion() throws Exception {
        // Get the asociacion
        restAsociacionMockMvc.perform(get("/api/asociacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsociacion() throws Exception {
        // Initialize the database
        asociacionService.save(asociacion);

        int databaseSizeBeforeUpdate = asociacionRepository.findAll().size();

        // Update the asociacion
        Asociacion updatedAsociacion = asociacionRepository.findOne(asociacion.getId());
        // Disconnect from session so that the updates on updatedAsociacion are not directly saved in db
        em.detach(updatedAsociacion);
        updatedAsociacion
            .nombre(UPDATED_NOMBRE);

        restAsociacionMockMvc.perform(put("/api/asociacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsociacion)))
            .andExpect(status().isOk());

        // Validate the Asociacion in the database
        List<Asociacion> asociacionList = asociacionRepository.findAll();
        assertThat(asociacionList).hasSize(databaseSizeBeforeUpdate);
        Asociacion testAsociacion = asociacionList.get(asociacionList.size() - 1);
        assertThat(testAsociacion.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the Asociacion in Elasticsearch
        Asociacion asociacionEs = asociacionSearchRepository.findOne(testAsociacion.getId());
        assertThat(asociacionEs).isEqualToIgnoringGivenFields(testAsociacion);
    }

    @Test
    @Transactional
    public void updateNonExistingAsociacion() throws Exception {
        int databaseSizeBeforeUpdate = asociacionRepository.findAll().size();

        // Create the Asociacion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAsociacionMockMvc.perform(put("/api/asociacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociacion)))
            .andExpect(status().isCreated());

        // Validate the Asociacion in the database
        List<Asociacion> asociacionList = asociacionRepository.findAll();
        assertThat(asociacionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAsociacion() throws Exception {
        // Initialize the database
        asociacionService.save(asociacion);

        int databaseSizeBeforeDelete = asociacionRepository.findAll().size();

        // Get the asociacion
        restAsociacionMockMvc.perform(delete("/api/asociacions/{id}", asociacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean asociacionExistsInEs = asociacionSearchRepository.exists(asociacion.getId());
        assertThat(asociacionExistsInEs).isFalse();

        // Validate the database is empty
        List<Asociacion> asociacionList = asociacionRepository.findAll();
        assertThat(asociacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAsociacion() throws Exception {
        // Initialize the database
        asociacionService.save(asociacion);

        // Search the asociacion
        restAsociacionMockMvc.perform(get("/api/_search/asociacions?query=id:" + asociacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asociacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Asociacion.class);
        Asociacion asociacion1 = new Asociacion();
        asociacion1.setId(1L);
        Asociacion asociacion2 = new Asociacion();
        asociacion2.setId(asociacion1.getId());
        assertThat(asociacion1).isEqualTo(asociacion2);
        asociacion2.setId(2L);
        assertThat(asociacion1).isNotEqualTo(asociacion2);
        asociacion1.setId(null);
        assertThat(asociacion1).isNotEqualTo(asociacion2);
    }
}
