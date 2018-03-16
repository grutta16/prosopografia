package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.FamiliarPersonaje;
import ar.gob.iighi.domain.Persona;
import ar.gob.iighi.domain.RelacionFamiliar;
import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.repository.FamiliarPersonajeRepository;
import ar.gob.iighi.service.FamiliarPersonajeService;
import ar.gob.iighi.repository.search.FamiliarPersonajeSearchRepository;
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
 * Test class for the FamiliarPersonajeResource REST controller.
 *
 * @see FamiliarPersonajeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class FamiliarPersonajeResourceIntTest {

    @Autowired
    private FamiliarPersonajeRepository familiarPersonajeRepository;

    @Autowired
    private FamiliarPersonajeService familiarPersonajeService;

    @Autowired
    private FamiliarPersonajeSearchRepository familiarPersonajeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFamiliarPersonajeMockMvc;

    private FamiliarPersonaje familiarPersonaje;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FamiliarPersonajeResource familiarPersonajeResource = new FamiliarPersonajeResource(familiarPersonajeService);
        this.restFamiliarPersonajeMockMvc = MockMvcBuilders.standaloneSetup(familiarPersonajeResource)
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
    public static FamiliarPersonaje createEntity(EntityManager em) {
        FamiliarPersonaje familiarPersonaje = new FamiliarPersonaje();
        // Add required entity
        Persona persona = PersonaResourceIntTest.createEntity(em);
        em.persist(persona);
        em.flush();
        familiarPersonaje.setPersona(persona);
        // Add required entity
        RelacionFamiliar relacionFamiliar = RelacionFamiliarResourceIntTest.createEntity(em);
        em.persist(relacionFamiliar);
        em.flush();
        familiarPersonaje.setRelacionFamiliar(relacionFamiliar);
        // Add required entity
        Personaje personaje = PersonajeResourceIntTest.createEntity(em);
        em.persist(personaje);
        em.flush();
        familiarPersonaje.setPersonaje(personaje);
        return familiarPersonaje;
    }

    @Before
    public void initTest() {
        familiarPersonajeSearchRepository.deleteAll();
        familiarPersonaje = createEntity(em);
    }

    @Test
    @Transactional
    public void createFamiliarPersonaje() throws Exception {
        int databaseSizeBeforeCreate = familiarPersonajeRepository.findAll().size();

        // Create the FamiliarPersonaje
        restFamiliarPersonajeMockMvc.perform(post("/api/familiar-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(familiarPersonaje)))
            .andExpect(status().isCreated());

        // Validate the FamiliarPersonaje in the database
        List<FamiliarPersonaje> familiarPersonajeList = familiarPersonajeRepository.findAll();
        assertThat(familiarPersonajeList).hasSize(databaseSizeBeforeCreate + 1);
        FamiliarPersonaje testFamiliarPersonaje = familiarPersonajeList.get(familiarPersonajeList.size() - 1);

        // Validate the FamiliarPersonaje in Elasticsearch
        FamiliarPersonaje familiarPersonajeEs = familiarPersonajeSearchRepository.findOne(testFamiliarPersonaje.getId());
        assertThat(familiarPersonajeEs).isEqualToIgnoringGivenFields(testFamiliarPersonaje);
    }

    @Test
    @Transactional
    public void createFamiliarPersonajeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = familiarPersonajeRepository.findAll().size();

        // Create the FamiliarPersonaje with an existing ID
        familiarPersonaje.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFamiliarPersonajeMockMvc.perform(post("/api/familiar-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(familiarPersonaje)))
            .andExpect(status().isBadRequest());

        // Validate the FamiliarPersonaje in the database
        List<FamiliarPersonaje> familiarPersonajeList = familiarPersonajeRepository.findAll();
        assertThat(familiarPersonajeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFamiliarPersonajes() throws Exception {
        // Initialize the database
        familiarPersonajeRepository.saveAndFlush(familiarPersonaje);

        // Get all the familiarPersonajeList
        restFamiliarPersonajeMockMvc.perform(get("/api/familiar-personajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(familiarPersonaje.getId().intValue())));
    }

    @Test
    @Transactional
    public void getFamiliarPersonaje() throws Exception {
        // Initialize the database
        familiarPersonajeRepository.saveAndFlush(familiarPersonaje);

        // Get the familiarPersonaje
        restFamiliarPersonajeMockMvc.perform(get("/api/familiar-personajes/{id}", familiarPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(familiarPersonaje.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFamiliarPersonaje() throws Exception {
        // Get the familiarPersonaje
        restFamiliarPersonajeMockMvc.perform(get("/api/familiar-personajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFamiliarPersonaje() throws Exception {
        // Initialize the database
        familiarPersonajeService.save(familiarPersonaje);

        int databaseSizeBeforeUpdate = familiarPersonajeRepository.findAll().size();

        // Update the familiarPersonaje
        FamiliarPersonaje updatedFamiliarPersonaje = familiarPersonajeRepository.findOne(familiarPersonaje.getId());
        // Disconnect from session so that the updates on updatedFamiliarPersonaje are not directly saved in db
        em.detach(updatedFamiliarPersonaje);

        restFamiliarPersonajeMockMvc.perform(put("/api/familiar-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFamiliarPersonaje)))
            .andExpect(status().isOk());

        // Validate the FamiliarPersonaje in the database
        List<FamiliarPersonaje> familiarPersonajeList = familiarPersonajeRepository.findAll();
        assertThat(familiarPersonajeList).hasSize(databaseSizeBeforeUpdate);
        FamiliarPersonaje testFamiliarPersonaje = familiarPersonajeList.get(familiarPersonajeList.size() - 1);

        // Validate the FamiliarPersonaje in Elasticsearch
        FamiliarPersonaje familiarPersonajeEs = familiarPersonajeSearchRepository.findOne(testFamiliarPersonaje.getId());
        assertThat(familiarPersonajeEs).isEqualToIgnoringGivenFields(testFamiliarPersonaje);
    }

    @Test
    @Transactional
    public void updateNonExistingFamiliarPersonaje() throws Exception {
        int databaseSizeBeforeUpdate = familiarPersonajeRepository.findAll().size();

        // Create the FamiliarPersonaje

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFamiliarPersonajeMockMvc.perform(put("/api/familiar-personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(familiarPersonaje)))
            .andExpect(status().isCreated());

        // Validate the FamiliarPersonaje in the database
        List<FamiliarPersonaje> familiarPersonajeList = familiarPersonajeRepository.findAll();
        assertThat(familiarPersonajeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFamiliarPersonaje() throws Exception {
        // Initialize the database
        familiarPersonajeService.save(familiarPersonaje);

        int databaseSizeBeforeDelete = familiarPersonajeRepository.findAll().size();

        // Get the familiarPersonaje
        restFamiliarPersonajeMockMvc.perform(delete("/api/familiar-personajes/{id}", familiarPersonaje.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean familiarPersonajeExistsInEs = familiarPersonajeSearchRepository.exists(familiarPersonaje.getId());
        assertThat(familiarPersonajeExistsInEs).isFalse();

        // Validate the database is empty
        List<FamiliarPersonaje> familiarPersonajeList = familiarPersonajeRepository.findAll();
        assertThat(familiarPersonajeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFamiliarPersonaje() throws Exception {
        // Initialize the database
        familiarPersonajeService.save(familiarPersonaje);

        // Search the familiarPersonaje
        restFamiliarPersonajeMockMvc.perform(get("/api/_search/familiar-personajes?query=id:" + familiarPersonaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(familiarPersonaje.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FamiliarPersonaje.class);
        FamiliarPersonaje familiarPersonaje1 = new FamiliarPersonaje();
        familiarPersonaje1.setId(1L);
        FamiliarPersonaje familiarPersonaje2 = new FamiliarPersonaje();
        familiarPersonaje2.setId(familiarPersonaje1.getId());
        assertThat(familiarPersonaje1).isEqualTo(familiarPersonaje2);
        familiarPersonaje2.setId(2L);
        assertThat(familiarPersonaje1).isNotEqualTo(familiarPersonaje2);
        familiarPersonaje1.setId(null);
        assertThat(familiarPersonaje1).isNotEqualTo(familiarPersonaje2);
    }
}
