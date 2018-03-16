package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.Lugar;
import ar.gob.iighi.domain.Provincia;
import ar.gob.iighi.repository.LugarRepository;
import ar.gob.iighi.service.LugarService;
import ar.gob.iighi.repository.search.LugarSearchRepository;
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
 * Test class for the LugarResource REST controller.
 *
 * @see LugarResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class LugarResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private LugarRepository lugarRepository;

    @Autowired
    private LugarService lugarService;

    @Autowired
    private LugarSearchRepository lugarSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLugarMockMvc;

    private Lugar lugar;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LugarResource lugarResource = new LugarResource(lugarService);
        this.restLugarMockMvc = MockMvcBuilders.standaloneSetup(lugarResource)
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
    public static Lugar createEntity(EntityManager em) {
        Lugar lugar = new Lugar()
            .nombre(DEFAULT_NOMBRE);
        // Add required entity
        Provincia provincia = ProvinciaResourceIntTest.createEntity(em);
        em.persist(provincia);
        em.flush();
        lugar.setProvincia(provincia);
        return lugar;
    }

    @Before
    public void initTest() {
        lugarSearchRepository.deleteAll();
        lugar = createEntity(em);
    }

    @Test
    @Transactional
    public void createLugar() throws Exception {
        int databaseSizeBeforeCreate = lugarRepository.findAll().size();

        // Create the Lugar
        restLugarMockMvc.perform(post("/api/lugars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lugar)))
            .andExpect(status().isCreated());

        // Validate the Lugar in the database
        List<Lugar> lugarList = lugarRepository.findAll();
        assertThat(lugarList).hasSize(databaseSizeBeforeCreate + 1);
        Lugar testLugar = lugarList.get(lugarList.size() - 1);
        assertThat(testLugar.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the Lugar in Elasticsearch
        Lugar lugarEs = lugarSearchRepository.findOne(testLugar.getId());
        assertThat(lugarEs).isEqualToIgnoringGivenFields(testLugar);
    }

    @Test
    @Transactional
    public void createLugarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lugarRepository.findAll().size();

        // Create the Lugar with an existing ID
        lugar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLugarMockMvc.perform(post("/api/lugars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lugar)))
            .andExpect(status().isBadRequest());

        // Validate the Lugar in the database
        List<Lugar> lugarList = lugarRepository.findAll();
        assertThat(lugarList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = lugarRepository.findAll().size();
        // set the field null
        lugar.setNombre(null);

        // Create the Lugar, which fails.

        restLugarMockMvc.perform(post("/api/lugars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lugar)))
            .andExpect(status().isBadRequest());

        List<Lugar> lugarList = lugarRepository.findAll();
        assertThat(lugarList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLugars() throws Exception {
        // Initialize the database
        lugarRepository.saveAndFlush(lugar);

        // Get all the lugarList
        restLugarMockMvc.perform(get("/api/lugars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lugar.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void getLugar() throws Exception {
        // Initialize the database
        lugarRepository.saveAndFlush(lugar);

        // Get the lugar
        restLugarMockMvc.perform(get("/api/lugars/{id}", lugar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lugar.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLugar() throws Exception {
        // Get the lugar
        restLugarMockMvc.perform(get("/api/lugars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLugar() throws Exception {
        // Initialize the database
        lugarService.save(lugar);

        int databaseSizeBeforeUpdate = lugarRepository.findAll().size();

        // Update the lugar
        Lugar updatedLugar = lugarRepository.findOne(lugar.getId());
        // Disconnect from session so that the updates on updatedLugar are not directly saved in db
        em.detach(updatedLugar);
        updatedLugar
            .nombre(UPDATED_NOMBRE);

        restLugarMockMvc.perform(put("/api/lugars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLugar)))
            .andExpect(status().isOk());

        // Validate the Lugar in the database
        List<Lugar> lugarList = lugarRepository.findAll();
        assertThat(lugarList).hasSize(databaseSizeBeforeUpdate);
        Lugar testLugar = lugarList.get(lugarList.size() - 1);
        assertThat(testLugar.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the Lugar in Elasticsearch
        Lugar lugarEs = lugarSearchRepository.findOne(testLugar.getId());
        assertThat(lugarEs).isEqualToIgnoringGivenFields(testLugar);
    }

    @Test
    @Transactional
    public void updateNonExistingLugar() throws Exception {
        int databaseSizeBeforeUpdate = lugarRepository.findAll().size();

        // Create the Lugar

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLugarMockMvc.perform(put("/api/lugars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lugar)))
            .andExpect(status().isCreated());

        // Validate the Lugar in the database
        List<Lugar> lugarList = lugarRepository.findAll();
        assertThat(lugarList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLugar() throws Exception {
        // Initialize the database
        lugarService.save(lugar);

        int databaseSizeBeforeDelete = lugarRepository.findAll().size();

        // Get the lugar
        restLugarMockMvc.perform(delete("/api/lugars/{id}", lugar.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean lugarExistsInEs = lugarSearchRepository.exists(lugar.getId());
        assertThat(lugarExistsInEs).isFalse();

        // Validate the database is empty
        List<Lugar> lugarList = lugarRepository.findAll();
        assertThat(lugarList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchLugar() throws Exception {
        // Initialize the database
        lugarService.save(lugar);

        // Search the lugar
        restLugarMockMvc.perform(get("/api/_search/lugars?query=id:" + lugar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lugar.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lugar.class);
        Lugar lugar1 = new Lugar();
        lugar1.setId(1L);
        Lugar lugar2 = new Lugar();
        lugar2.setId(lugar1.getId());
        assertThat(lugar1).isEqualTo(lugar2);
        lugar2.setId(2L);
        assertThat(lugar1).isNotEqualTo(lugar2);
        lugar1.setId(null);
        assertThat(lugar1).isNotEqualTo(lugar2);
    }
}
