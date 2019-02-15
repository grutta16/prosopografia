package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.EstudioPersonaje;
import ar.gob.iighi.domain.Institucion;
import ar.gob.iighi.domain.Carrera;
import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.repository.EstudioPersonajeRepository;
import ar.gob.iighi.service.EstudioPersonajeService;
import ar.gob.iighi.repository.search.EstudioPersonajeSearchRepository;
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
 * Test class for the EstudioPersonajeResource REST controller.
 *
 * @see EstudioPersonajeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class EstudioPersonajeResourceIntTest {

    private static final Integer DEFAULT_ANIO_INICIO = 1;
    private static final Integer UPDATED_ANIO_INICIO = 2;

    private static final Integer DEFAULT_ANIO_FIN = 1;
    private static final Integer UPDATED_ANIO_FIN = 2;

    @Autowired
    private EstudioPersonajeRepository estudioPersonajeRepository;

    @Autowired
    private EstudioPersonajeService estudioPersonajeService;

    @Autowired
    private EstudioPersonajeSearchRepository estudioPersonajeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEstudioPersonajeMockMvc;

    private EstudioPersonaje estudioPersonaje;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstudioPersonajeResource estudioPersonajeResource = new EstudioPersonajeResource(estudioPersonajeService);
        this.restEstudioPersonajeMockMvc = MockMvcBuilders.standaloneSetup(estudioPersonajeResource)
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
    public static EstudioPersonaje createEntity(EntityManager em) {
        EstudioPersonaje estudioPersonaje = new EstudioPersonaje()
            .anioInicio(DEFAULT_ANIO_INICIO)
            .anioFin(DEFAULT_ANIO_FIN);
        // Add required entity
        Institucion institucion = InstitucionResourceIntTest.createEntity(em);
        em.persist(institucion);
        em.flush();
        estudioPersonaje.setInstitucion(institucion);
        // Add required entity
        Carrera carrera = CarreraResourceIntTest.createEntity(em);
        em.persist(carrera);
        em.flush();
        estudioPersonaje.setCarrera(carrera);
        // Add required entity
        Personaje personaje = PersonajeResourceIntTest.createEntity(em);
        em.persist(personaje);
        em.flush();
        estudioPersonaje.setPersonaje(personaje);
        return estudioPersonaje;
    }

    @Before
    public void initTest() {
        estudioPersonajeSearchRepository.deleteAll();
        estudioPersonaje = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstudioPersonaje() throws Exception {
        int databaseSizeBeforeCreate = estudioPersonajeRepository.findAll().size();

        // Create the EstudioPersonaje
        restEstudioPersonajeMockMvc.perform(post("/api/estudio-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estudioPersonaje)))
            .andExpect(status().isCreated());

        // Validate the EstudioPersonaje in the database
        List<EstudioPersonaje> estudioPersonajeList = estudioPersonajeRepository.findAll();
        assertThat(estudioPersonajeList).hasSize(databaseSizeBeforeCreate + 1);
        EstudioPersonaje testEstudioPersonaje = estudioPersonajeList.get(estudioPersonajeList.size() - 1);
        assertThat(testEstudioPersonaje.getAnioInicio()).isEqualTo(DEFAULT_ANIO_INICIO);
        assertThat(testEstudioPersonaje.getAnioFin()).isEqualTo(DEFAULT_ANIO_FIN);

        // Validate the EstudioPersonaje in Elasticsearch
        EstudioPersonaje estudioPersonajeEs = estudioPersonajeSearchRepository.findOne(testEstudioPersonaje.getId());
        assertThat(estudioPersonajeEs).isEqualToIgnoringGivenFields(testEstudioPersonaje);
    }

    @Test
    @Transactional
    public void createEstudioPersonajeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estudioPersonajeRepository.findAll().size();

        // Create the EstudioPersonaje with an existing ID
        estudioPersonaje.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstudioPersonajeMockMvc.perform(post("/api/estudio-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estudioPersonaje)))
            .andExpect(status().isBadRequest());

        // Validate the EstudioPersonaje in the database
        List<EstudioPersonaje> estudioPersonajeList = estudioPersonajeRepository.findAll();
        assertThat(estudioPersonajeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEstudioPersonajes() throws Exception {
        // Initialize the database
        estudioPersonajeRepository.saveAndFlush(estudioPersonaje);

        // Get all the estudioPersonajeList
        restEstudioPersonajeMockMvc.perform(get("/api/estudio-personajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estudioPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].anioInicio").value(hasItem(DEFAULT_ANIO_INICIO)))
            .andExpect(jsonPath("$.[*].anioFin").value(hasItem(DEFAULT_ANIO_FIN)));
    }

    @Test
    @Transactional
    public void getEstudioPersonaje() throws Exception {
        // Initialize the database
        estudioPersonajeRepository.saveAndFlush(estudioPersonaje);

        // Get the estudioPersonaje
        restEstudioPersonajeMockMvc.perform(get("/api/estudio-personajes/{id}", estudioPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estudioPersonaje.getId().intValue()))
            .andExpect(jsonPath("$.anioInicio").value(DEFAULT_ANIO_INICIO))
            .andExpect(jsonPath("$.anioFin").value(DEFAULT_ANIO_FIN));
    }

    @Test
    @Transactional
    public void getNonExistingEstudioPersonaje() throws Exception {
        // Get the estudioPersonaje
        restEstudioPersonajeMockMvc.perform(get("/api/estudio-personajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstudioPersonaje() throws Exception {
        // Initialize the database
        estudioPersonajeService.save(estudioPersonaje);

        int databaseSizeBeforeUpdate = estudioPersonajeRepository.findAll().size();

        // Update the estudioPersonaje
        EstudioPersonaje updatedEstudioPersonaje = estudioPersonajeRepository.findOne(estudioPersonaje.getId());
        // Disconnect from session so that the updates on updatedEstudioPersonaje are not directly saved in db
        em.detach(updatedEstudioPersonaje);
        updatedEstudioPersonaje
            .anioInicio(UPDATED_ANIO_INICIO)
            .anioFin(UPDATED_ANIO_FIN);

        restEstudioPersonajeMockMvc.perform(put("/api/estudio-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstudioPersonaje)))
            .andExpect(status().isOk());

        // Validate the EstudioPersonaje in the database
        List<EstudioPersonaje> estudioPersonajeList = estudioPersonajeRepository.findAll();
        assertThat(estudioPersonajeList).hasSize(databaseSizeBeforeUpdate);
        EstudioPersonaje testEstudioPersonaje = estudioPersonajeList.get(estudioPersonajeList.size() - 1);
        assertThat(testEstudioPersonaje.getAnioInicio()).isEqualTo(UPDATED_ANIO_INICIO);
        assertThat(testEstudioPersonaje.getAnioFin()).isEqualTo(UPDATED_ANIO_FIN);

        // Validate the EstudioPersonaje in Elasticsearch
        EstudioPersonaje estudioPersonajeEs = estudioPersonajeSearchRepository.findOne(testEstudioPersonaje.getId());
        assertThat(estudioPersonajeEs).isEqualToIgnoringGivenFields(testEstudioPersonaje);
    }

    @Test
    @Transactional
    public void updateNonExistingEstudioPersonaje() throws Exception {
        int databaseSizeBeforeUpdate = estudioPersonajeRepository.findAll().size();

        // Create the EstudioPersonaje

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEstudioPersonajeMockMvc.perform(put("/api/estudio-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estudioPersonaje)))
            .andExpect(status().isCreated());

        // Validate the EstudioPersonaje in the database
        List<EstudioPersonaje> estudioPersonajeList = estudioPersonajeRepository.findAll();
        assertThat(estudioPersonajeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEstudioPersonaje() throws Exception {
        // Initialize the database
        estudioPersonajeService.save(estudioPersonaje);

        int databaseSizeBeforeDelete = estudioPersonajeRepository.findAll().size();

        // Get the estudioPersonaje
        restEstudioPersonajeMockMvc.perform(delete("/api/estudio-personajes/{id}", estudioPersonaje.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean estudioPersonajeExistsInEs = estudioPersonajeSearchRepository.exists(estudioPersonaje.getId());
        assertThat(estudioPersonajeExistsInEs).isFalse();

        // Validate the database is empty
        List<EstudioPersonaje> estudioPersonajeList = estudioPersonajeRepository.findAll();
        assertThat(estudioPersonajeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEstudioPersonaje() throws Exception {
        // Initialize the database
        estudioPersonajeService.save(estudioPersonaje);

        // Search the estudioPersonaje
        restEstudioPersonajeMockMvc.perform(get("/api/_search/estudio-personajes?query=id:" + estudioPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estudioPersonaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].anioInicio").value(hasItem(DEFAULT_ANIO_INICIO)))
            .andExpect(jsonPath("$.[*].anioFin").value(hasItem(DEFAULT_ANIO_FIN)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstudioPersonaje.class);
        EstudioPersonaje estudioPersonaje1 = new EstudioPersonaje();
        estudioPersonaje1.setId(1L);
        EstudioPersonaje estudioPersonaje2 = new EstudioPersonaje();
        estudioPersonaje2.setId(estudioPersonaje1.getId());
        assertThat(estudioPersonaje1).isEqualTo(estudioPersonaje2);
        estudioPersonaje2.setId(2L);
        assertThat(estudioPersonaje1).isNotEqualTo(estudioPersonaje2);
        estudioPersonaje1.setId(null);
        assertThat(estudioPersonaje1).isNotEqualTo(estudioPersonaje2);
    }
}
