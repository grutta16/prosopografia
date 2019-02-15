package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.Institucion;
import ar.gob.iighi.domain.Lugar;
import ar.gob.iighi.repository.InstitucionRepository;
import ar.gob.iighi.service.InstitucionService;
import ar.gob.iighi.repository.search.InstitucionSearchRepository;
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

import ar.gob.iighi.domain.enumeration.Nivel;
/**
 * Test class for the InstitucionResource REST controller.
 *
 * @see InstitucionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class InstitucionResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Nivel DEFAULT_NIVEL = Nivel.PRIMARIO;
    private static final Nivel UPDATED_NIVEL = Nivel.SECUNDARIO;

    @Autowired
    private InstitucionRepository institucionRepository;

    @Autowired
    private InstitucionService institucionService;

    @Autowired
    private InstitucionSearchRepository institucionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInstitucionMockMvc;

    private Institucion institucion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InstitucionResource institucionResource = new InstitucionResource(institucionService);
        this.restInstitucionMockMvc = MockMvcBuilders.standaloneSetup(institucionResource)
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
    public static Institucion createEntity(EntityManager em) {
        Institucion institucion = new Institucion()
            .nombre(DEFAULT_NOMBRE)
            .nivel(DEFAULT_NIVEL);
        // Add required entity
        Lugar lugar = LugarResourceIntTest.createEntity(em);
        em.persist(lugar);
        em.flush();
        institucion.setLugar(lugar);
        return institucion;
    }

    @Before
    public void initTest() {
        institucionSearchRepository.deleteAll();
        institucion = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstitucion() throws Exception {
        int databaseSizeBeforeCreate = institucionRepository.findAll().size();

        // Create the Institucion
        restInstitucionMockMvc.perform(post("/api/institucions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isCreated());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeCreate + 1);
        Institucion testInstitucion = institucionList.get(institucionList.size() - 1);
        assertThat(testInstitucion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testInstitucion.getNivel()).isEqualTo(DEFAULT_NIVEL);

        // Validate the Institucion in Elasticsearch
        Institucion institucionEs = institucionSearchRepository.findOne(testInstitucion.getId());
        assertThat(institucionEs).isEqualToIgnoringGivenFields(testInstitucion);
    }

    @Test
    @Transactional
    public void createInstitucionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = institucionRepository.findAll().size();

        // Create the Institucion with an existing ID
        institucion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstitucionMockMvc.perform(post("/api/institucions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isBadRequest());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = institucionRepository.findAll().size();
        // set the field null
        institucion.setNombre(null);

        // Create the Institucion, which fails.

        restInstitucionMockMvc.perform(post("/api/institucions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isBadRequest());

        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInstitucions() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get all the institucionList
        restInstitucionMockMvc.perform(get("/api/institucions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(institucion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].nivel").value(hasItem(DEFAULT_NIVEL.toString())));
    }

    @Test
    @Transactional
    public void getInstitucion() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get the institucion
        restInstitucionMockMvc.perform(get("/api/institucions/{id}", institucion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(institucion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.nivel").value(DEFAULT_NIVEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInstitucion() throws Exception {
        // Get the institucion
        restInstitucionMockMvc.perform(get("/api/institucions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstitucion() throws Exception {
        // Initialize the database
        institucionService.save(institucion);

        int databaseSizeBeforeUpdate = institucionRepository.findAll().size();

        // Update the institucion
        Institucion updatedInstitucion = institucionRepository.findOne(institucion.getId());
        // Disconnect from session so that the updates on updatedInstitucion are not directly saved in db
        em.detach(updatedInstitucion);
        updatedInstitucion
            .nombre(UPDATED_NOMBRE)
            .nivel(UPDATED_NIVEL);

        restInstitucionMockMvc.perform(put("/api/institucions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInstitucion)))
            .andExpect(status().isOk());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeUpdate);
        Institucion testInstitucion = institucionList.get(institucionList.size() - 1);
        assertThat(testInstitucion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testInstitucion.getNivel()).isEqualTo(UPDATED_NIVEL);

        // Validate the Institucion in Elasticsearch
        Institucion institucionEs = institucionSearchRepository.findOne(testInstitucion.getId());
        assertThat(institucionEs).isEqualToIgnoringGivenFields(testInstitucion);
    }

    @Test
    @Transactional
    public void updateNonExistingInstitucion() throws Exception {
        int databaseSizeBeforeUpdate = institucionRepository.findAll().size();

        // Create the Institucion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInstitucionMockMvc.perform(put("/api/institucions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isCreated());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInstitucion() throws Exception {
        // Initialize the database
        institucionService.save(institucion);

        int databaseSizeBeforeDelete = institucionRepository.findAll().size();

        // Get the institucion
        restInstitucionMockMvc.perform(delete("/api/institucions/{id}", institucion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean institucionExistsInEs = institucionSearchRepository.exists(institucion.getId());
        assertThat(institucionExistsInEs).isFalse();

        // Validate the database is empty
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchInstitucion() throws Exception {
        // Initialize the database
        institucionService.save(institucion);

        // Search the institucion
        restInstitucionMockMvc.perform(get("/api/_search/institucions?query=id:" + institucion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(institucion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].nivel").value(hasItem(DEFAULT_NIVEL.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Institucion.class);
        Institucion institucion1 = new Institucion();
        institucion1.setId(1L);
        Institucion institucion2 = new Institucion();
        institucion2.setId(institucion1.getId());
        assertThat(institucion1).isEqualTo(institucion2);
        institucion2.setId(2L);
        assertThat(institucion1).isNotEqualTo(institucion2);
        institucion1.setId(null);
        assertThat(institucion1).isNotEqualTo(institucion2);
    }
}
