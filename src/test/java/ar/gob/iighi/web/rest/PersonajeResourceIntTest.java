package ar.gob.iighi.web.rest;

import ar.gob.iighi.ProsopografiaApp;

import ar.gob.iighi.domain.Personaje;
import ar.gob.iighi.domain.Persona;
import ar.gob.iighi.domain.Lugar;
import ar.gob.iighi.domain.Lugar;
import ar.gob.iighi.domain.Profesion;
import ar.gob.iighi.domain.ParejaPersonaje;
import ar.gob.iighi.domain.FamiliarPersonaje;
import ar.gob.iighi.domain.EstudioPersonaje;
import ar.gob.iighi.domain.AsociacionPersonaje;
import ar.gob.iighi.domain.PartidoPersonaje;
import ar.gob.iighi.domain.ReligionPersonaje;
import ar.gob.iighi.domain.ResidenciaPersonaje;
import ar.gob.iighi.domain.CargoPersonaje;
import ar.gob.iighi.repository.PersonajeRepository;
import ar.gob.iighi.service.PersonajeService;
import ar.gob.iighi.repository.search.PersonajeSearchRepository;
import ar.gob.iighi.web.rest.errors.ExceptionTranslator;
import ar.gob.iighi.service.dto.PersonajeCriteria;
import ar.gob.iighi.service.PersonajeQueryService;

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
 * Test class for the PersonajeResource REST controller.
 *
 * @see PersonajeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProsopografiaApp.class)
public class PersonajeResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_NACIMIENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_NACIMIENTO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_DEFUNCION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_DEFUNCION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOMBRES_ALTERNATIVOS = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRES_ALTERNATIVOS = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDOS_ALTERNATIVOS = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDOS_ALTERNATIVOS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SEXO = false;
    private static final Boolean UPDATED_SEXO = true;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private PersonajeRepository personajeRepository;

    @Autowired
    private PersonajeService personajeService;

    @Autowired
    private PersonajeSearchRepository personajeSearchRepository;

    @Autowired
    private PersonajeQueryService personajeQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPersonajeMockMvc;

    private Personaje personaje;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonajeResource personajeResource = new PersonajeResource(personajeService, personajeQueryService);
        this.restPersonajeMockMvc = MockMvcBuilders.standaloneSetup(personajeResource)
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
    public static Personaje createEntity(EntityManager em) {
        Personaje personaje = new Personaje()
            .fechaNacimiento(DEFAULT_FECHA_NACIMIENTO)
            .fechaDefuncion(DEFAULT_FECHA_DEFUNCION)
            .nombresAlternativos(DEFAULT_NOMBRES_ALTERNATIVOS)
            .apellidosAlternativos(DEFAULT_APELLIDOS_ALTERNATIVOS)
            .sexo(DEFAULT_SEXO)
            .observaciones(DEFAULT_OBSERVACIONES);
        // Add required entity
        Persona persona = PersonaResourceIntTest.createEntity(em);
        em.persist(persona);
        em.flush();
        personaje.setPersona(persona);
        return personaje;
    }

    @Before
    public void initTest() {
        personajeSearchRepository.deleteAll();
        personaje = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersonaje() throws Exception {
        int databaseSizeBeforeCreate = personajeRepository.findAll().size();

        // Create the Personaje
        restPersonajeMockMvc.perform(post("/api/personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personaje)))
            .andExpect(status().isCreated());

        // Validate the Personaje in the database
        List<Personaje> personajeList = personajeRepository.findAll();
        assertThat(personajeList).hasSize(databaseSizeBeforeCreate + 1);
        Personaje testPersonaje = personajeList.get(personajeList.size() - 1);
        assertThat(testPersonaje.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
        assertThat(testPersonaje.getFechaDefuncion()).isEqualTo(DEFAULT_FECHA_DEFUNCION);
        assertThat(testPersonaje.getNombresAlternativos()).isEqualTo(DEFAULT_NOMBRES_ALTERNATIVOS);
        assertThat(testPersonaje.getApellidosAlternativos()).isEqualTo(DEFAULT_APELLIDOS_ALTERNATIVOS);
        assertThat(testPersonaje.isSexo()).isEqualTo(DEFAULT_SEXO);
        assertThat(testPersonaje.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);

        // Validate the Personaje in Elasticsearch
        Personaje personajeEs = personajeSearchRepository.findOne(testPersonaje.getId());
        assertThat(personajeEs).isEqualToIgnoringGivenFields(testPersonaje);
    }

    @Test
    @Transactional
    public void createPersonajeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personajeRepository.findAll().size();

        // Create the Personaje with an existing ID
        personaje.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonajeMockMvc.perform(post("/api/personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personaje)))
            .andExpect(status().isBadRequest());

        // Validate the Personaje in the database
        List<Personaje> personajeList = personajeRepository.findAll();
        assertThat(personajeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPersonajes() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList
        restPersonajeMockMvc.perform(get("/api/personajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].fechaDefuncion").value(hasItem(DEFAULT_FECHA_DEFUNCION.toString())))
            .andExpect(jsonPath("$.[*].nombresAlternativos").value(hasItem(DEFAULT_NOMBRES_ALTERNATIVOS.toString())))
            .andExpect(jsonPath("$.[*].apellidosAlternativos").value(hasItem(DEFAULT_APELLIDOS_ALTERNATIVOS.toString())))
            .andExpect(jsonPath("$.[*].sexo").value(hasItem(DEFAULT_SEXO.booleanValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void getPersonaje() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get the personaje
        restPersonajeMockMvc.perform(get("/api/personajes/{id}", personaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(personaje.getId().intValue()))
            .andExpect(jsonPath("$.fechaNacimiento").value(DEFAULT_FECHA_NACIMIENTO.toString()))
            .andExpect(jsonPath("$.fechaDefuncion").value(DEFAULT_FECHA_DEFUNCION.toString()))
            .andExpect(jsonPath("$.nombresAlternativos").value(DEFAULT_NOMBRES_ALTERNATIVOS.toString()))
            .andExpect(jsonPath("$.apellidosAlternativos").value(DEFAULT_APELLIDOS_ALTERNATIVOS.toString()))
            .andExpect(jsonPath("$.sexo").value(DEFAULT_SEXO.booleanValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()));
    }

    @Test
    @Transactional
    public void getAllPersonajesByFechaNacimientoIsEqualToSomething() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where fechaNacimiento equals to DEFAULT_FECHA_NACIMIENTO
        defaultPersonajeShouldBeFound("fechaNacimiento.equals=" + DEFAULT_FECHA_NACIMIENTO);

        // Get all the personajeList where fechaNacimiento equals to UPDATED_FECHA_NACIMIENTO
        defaultPersonajeShouldNotBeFound("fechaNacimiento.equals=" + UPDATED_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllPersonajesByFechaNacimientoIsInShouldWork() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where fechaNacimiento in DEFAULT_FECHA_NACIMIENTO or UPDATED_FECHA_NACIMIENTO
        defaultPersonajeShouldBeFound("fechaNacimiento.in=" + DEFAULT_FECHA_NACIMIENTO + "," + UPDATED_FECHA_NACIMIENTO);

        // Get all the personajeList where fechaNacimiento equals to UPDATED_FECHA_NACIMIENTO
        defaultPersonajeShouldNotBeFound("fechaNacimiento.in=" + UPDATED_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllPersonajesByFechaNacimientoIsNullOrNotNull() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where fechaNacimiento is not null
        defaultPersonajeShouldBeFound("fechaNacimiento.specified=true");

        // Get all the personajeList where fechaNacimiento is null
        defaultPersonajeShouldNotBeFound("fechaNacimiento.specified=false");
    }

    @Test
    @Transactional
    public void getAllPersonajesByFechaNacimientoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where fechaNacimiento greater than or equals to DEFAULT_FECHA_NACIMIENTO
        defaultPersonajeShouldBeFound("fechaNacimiento.greaterOrEqualThan=" + DEFAULT_FECHA_NACIMIENTO);

        // Get all the personajeList where fechaNacimiento greater than or equals to UPDATED_FECHA_NACIMIENTO
        defaultPersonajeShouldNotBeFound("fechaNacimiento.greaterOrEqualThan=" + UPDATED_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllPersonajesByFechaNacimientoIsLessThanSomething() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where fechaNacimiento less than or equals to DEFAULT_FECHA_NACIMIENTO
        defaultPersonajeShouldNotBeFound("fechaNacimiento.lessThan=" + DEFAULT_FECHA_NACIMIENTO);

        // Get all the personajeList where fechaNacimiento less than or equals to UPDATED_FECHA_NACIMIENTO
        defaultPersonajeShouldBeFound("fechaNacimiento.lessThan=" + UPDATED_FECHA_NACIMIENTO);
    }


    @Test
    @Transactional
    public void getAllPersonajesByFechaDefuncionIsEqualToSomething() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where fechaDefuncion equals to DEFAULT_FECHA_DEFUNCION
        defaultPersonajeShouldBeFound("fechaDefuncion.equals=" + DEFAULT_FECHA_DEFUNCION);

        // Get all the personajeList where fechaDefuncion equals to UPDATED_FECHA_DEFUNCION
        defaultPersonajeShouldNotBeFound("fechaDefuncion.equals=" + UPDATED_FECHA_DEFUNCION);
    }

    @Test
    @Transactional
    public void getAllPersonajesByFechaDefuncionIsInShouldWork() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where fechaDefuncion in DEFAULT_FECHA_DEFUNCION or UPDATED_FECHA_DEFUNCION
        defaultPersonajeShouldBeFound("fechaDefuncion.in=" + DEFAULT_FECHA_DEFUNCION + "," + UPDATED_FECHA_DEFUNCION);

        // Get all the personajeList where fechaDefuncion equals to UPDATED_FECHA_DEFUNCION
        defaultPersonajeShouldNotBeFound("fechaDefuncion.in=" + UPDATED_FECHA_DEFUNCION);
    }

    @Test
    @Transactional
    public void getAllPersonajesByFechaDefuncionIsNullOrNotNull() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where fechaDefuncion is not null
        defaultPersonajeShouldBeFound("fechaDefuncion.specified=true");

        // Get all the personajeList where fechaDefuncion is null
        defaultPersonajeShouldNotBeFound("fechaDefuncion.specified=false");
    }

    @Test
    @Transactional
    public void getAllPersonajesByFechaDefuncionIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where fechaDefuncion greater than or equals to DEFAULT_FECHA_DEFUNCION
        defaultPersonajeShouldBeFound("fechaDefuncion.greaterOrEqualThan=" + DEFAULT_FECHA_DEFUNCION);

        // Get all the personajeList where fechaDefuncion greater than or equals to UPDATED_FECHA_DEFUNCION
        defaultPersonajeShouldNotBeFound("fechaDefuncion.greaterOrEqualThan=" + UPDATED_FECHA_DEFUNCION);
    }

    @Test
    @Transactional
    public void getAllPersonajesByFechaDefuncionIsLessThanSomething() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where fechaDefuncion less than or equals to DEFAULT_FECHA_DEFUNCION
        defaultPersonajeShouldNotBeFound("fechaDefuncion.lessThan=" + DEFAULT_FECHA_DEFUNCION);

        // Get all the personajeList where fechaDefuncion less than or equals to UPDATED_FECHA_DEFUNCION
        defaultPersonajeShouldBeFound("fechaDefuncion.lessThan=" + UPDATED_FECHA_DEFUNCION);
    }


    @Test
    @Transactional
    public void getAllPersonajesByNombresAlternativosIsEqualToSomething() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where nombresAlternativos equals to DEFAULT_NOMBRES_ALTERNATIVOS
        defaultPersonajeShouldBeFound("nombresAlternativos.equals=" + DEFAULT_NOMBRES_ALTERNATIVOS);

        // Get all the personajeList where nombresAlternativos equals to UPDATED_NOMBRES_ALTERNATIVOS
        defaultPersonajeShouldNotBeFound("nombresAlternativos.equals=" + UPDATED_NOMBRES_ALTERNATIVOS);
    }

    @Test
    @Transactional
    public void getAllPersonajesByNombresAlternativosIsInShouldWork() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where nombresAlternativos in DEFAULT_NOMBRES_ALTERNATIVOS or UPDATED_NOMBRES_ALTERNATIVOS
        defaultPersonajeShouldBeFound("nombresAlternativos.in=" + DEFAULT_NOMBRES_ALTERNATIVOS + "," + UPDATED_NOMBRES_ALTERNATIVOS);

        // Get all the personajeList where nombresAlternativos equals to UPDATED_NOMBRES_ALTERNATIVOS
        defaultPersonajeShouldNotBeFound("nombresAlternativos.in=" + UPDATED_NOMBRES_ALTERNATIVOS);
    }

    @Test
    @Transactional
    public void getAllPersonajesByNombresAlternativosIsNullOrNotNull() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where nombresAlternativos is not null
        defaultPersonajeShouldBeFound("nombresAlternativos.specified=true");

        // Get all the personajeList where nombresAlternativos is null
        defaultPersonajeShouldNotBeFound("nombresAlternativos.specified=false");
    }

    @Test
    @Transactional
    public void getAllPersonajesByApellidosAlternativosIsEqualToSomething() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where apellidosAlternativos equals to DEFAULT_APELLIDOS_ALTERNATIVOS
        defaultPersonajeShouldBeFound("apellidosAlternativos.equals=" + DEFAULT_APELLIDOS_ALTERNATIVOS);

        // Get all the personajeList where apellidosAlternativos equals to UPDATED_APELLIDOS_ALTERNATIVOS
        defaultPersonajeShouldNotBeFound("apellidosAlternativos.equals=" + UPDATED_APELLIDOS_ALTERNATIVOS);
    }

    @Test
    @Transactional
    public void getAllPersonajesByApellidosAlternativosIsInShouldWork() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where apellidosAlternativos in DEFAULT_APELLIDOS_ALTERNATIVOS or UPDATED_APELLIDOS_ALTERNATIVOS
        defaultPersonajeShouldBeFound("apellidosAlternativos.in=" + DEFAULT_APELLIDOS_ALTERNATIVOS + "," + UPDATED_APELLIDOS_ALTERNATIVOS);

        // Get all the personajeList where apellidosAlternativos equals to UPDATED_APELLIDOS_ALTERNATIVOS
        defaultPersonajeShouldNotBeFound("apellidosAlternativos.in=" + UPDATED_APELLIDOS_ALTERNATIVOS);
    }

    @Test
    @Transactional
    public void getAllPersonajesByApellidosAlternativosIsNullOrNotNull() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where apellidosAlternativos is not null
        defaultPersonajeShouldBeFound("apellidosAlternativos.specified=true");

        // Get all the personajeList where apellidosAlternativos is null
        defaultPersonajeShouldNotBeFound("apellidosAlternativos.specified=false");
    }

    @Test
    @Transactional
    public void getAllPersonajesBySexoIsEqualToSomething() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where sexo equals to DEFAULT_SEXO
        defaultPersonajeShouldBeFound("sexo.equals=" + DEFAULT_SEXO);

        // Get all the personajeList where sexo equals to UPDATED_SEXO
        defaultPersonajeShouldNotBeFound("sexo.equals=" + UPDATED_SEXO);
    }

    @Test
    @Transactional
    public void getAllPersonajesBySexoIsInShouldWork() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where sexo in DEFAULT_SEXO or UPDATED_SEXO
        defaultPersonajeShouldBeFound("sexo.in=" + DEFAULT_SEXO + "," + UPDATED_SEXO);

        // Get all the personajeList where sexo equals to UPDATED_SEXO
        defaultPersonajeShouldNotBeFound("sexo.in=" + UPDATED_SEXO);
    }

    @Test
    @Transactional
    public void getAllPersonajesBySexoIsNullOrNotNull() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where sexo is not null
        defaultPersonajeShouldBeFound("sexo.specified=true");

        // Get all the personajeList where sexo is null
        defaultPersonajeShouldNotBeFound("sexo.specified=false");
    }

    @Test
    @Transactional
    public void getAllPersonajesByObservacionesIsEqualToSomething() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where observaciones equals to DEFAULT_OBSERVACIONES
        defaultPersonajeShouldBeFound("observaciones.equals=" + DEFAULT_OBSERVACIONES);

        // Get all the personajeList where observaciones equals to UPDATED_OBSERVACIONES
        defaultPersonajeShouldNotBeFound("observaciones.equals=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void getAllPersonajesByObservacionesIsInShouldWork() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where observaciones in DEFAULT_OBSERVACIONES or UPDATED_OBSERVACIONES
        defaultPersonajeShouldBeFound("observaciones.in=" + DEFAULT_OBSERVACIONES + "," + UPDATED_OBSERVACIONES);

        // Get all the personajeList where observaciones equals to UPDATED_OBSERVACIONES
        defaultPersonajeShouldNotBeFound("observaciones.in=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void getAllPersonajesByObservacionesIsNullOrNotNull() throws Exception {
        // Initialize the database
        personajeRepository.saveAndFlush(personaje);

        // Get all the personajeList where observaciones is not null
        defaultPersonajeShouldBeFound("observaciones.specified=true");

        // Get all the personajeList where observaciones is null
        defaultPersonajeShouldNotBeFound("observaciones.specified=false");
    }

    @Test
    @Transactional
    public void getAllPersonajesByPersonaIsEqualToSomething() throws Exception {
        // Initialize the database
        Persona persona = PersonaResourceIntTest.createEntity(em);
        em.persist(persona);
        em.flush();
        personaje.setPersona(persona);
        personajeRepository.saveAndFlush(personaje);
        Long personaId = persona.getId();

        // Get all the personajeList where persona equals to personaId
        defaultPersonajeShouldBeFound("personaId.equals=" + personaId);

        // Get all the personajeList where persona equals to personaId + 1
        defaultPersonajeShouldNotBeFound("personaId.equals=" + (personaId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByLugarNacimientoIsEqualToSomething() throws Exception {
        // Initialize the database
        Lugar lugarNacimiento = LugarResourceIntTest.createEntity(em);
        em.persist(lugarNacimiento);
        em.flush();
        personaje.setLugarNacimiento(lugarNacimiento);
        personajeRepository.saveAndFlush(personaje);
        Long lugarNacimientoId = lugarNacimiento.getId();

        // Get all the personajeList where lugarNacimiento equals to lugarNacimientoId
        defaultPersonajeShouldBeFound("lugarNacimientoId.equals=" + lugarNacimientoId);

        // Get all the personajeList where lugarNacimiento equals to lugarNacimientoId + 1
        defaultPersonajeShouldNotBeFound("lugarNacimientoId.equals=" + (lugarNacimientoId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByLugarDefuncionIsEqualToSomething() throws Exception {
        // Initialize the database
        Lugar lugarDefuncion = LugarResourceIntTest.createEntity(em);
        em.persist(lugarDefuncion);
        em.flush();
        personaje.setLugarDefuncion(lugarDefuncion);
        personajeRepository.saveAndFlush(personaje);
        Long lugarDefuncionId = lugarDefuncion.getId();

        // Get all the personajeList where lugarDefuncion equals to lugarDefuncionId
        defaultPersonajeShouldBeFound("lugarDefuncionId.equals=" + lugarDefuncionId);

        // Get all the personajeList where lugarDefuncion equals to lugarDefuncionId + 1
        defaultPersonajeShouldNotBeFound("lugarDefuncionId.equals=" + (lugarDefuncionId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByProfesionesIsEqualToSomething() throws Exception {
        // Initialize the database
        Profesion profesiones = ProfesionResourceIntTest.createEntity(em);
        em.persist(profesiones);
        em.flush();
        personaje.addProfesiones(profesiones);
        personajeRepository.saveAndFlush(personaje);
        Long profesionesId = profesiones.getId();

        // Get all the personajeList where profesiones equals to profesionesId
        defaultPersonajeShouldBeFound("profesionesId.equals=" + profesionesId);

        // Get all the personajeList where profesiones equals to profesionesId + 1
        defaultPersonajeShouldNotBeFound("profesionesId.equals=" + (profesionesId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByParejasIsEqualToSomething() throws Exception {
        // Initialize the database
        ParejaPersonaje parejas = ParejaPersonajeResourceIntTest.createEntity(em);
        em.persist(parejas);
        em.flush();
        personaje.addParejas(parejas);
        personajeRepository.saveAndFlush(personaje);
        Long parejasId = parejas.getId();

        // Get all the personajeList where parejas equals to parejasId
        defaultPersonajeShouldBeFound("parejasId.equals=" + parejasId);

        // Get all the personajeList where parejas equals to parejasId + 1
        defaultPersonajeShouldNotBeFound("parejasId.equals=" + (parejasId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByFamiliaresIsEqualToSomething() throws Exception {
        // Initialize the database
        FamiliarPersonaje familiares = FamiliarPersonajeResourceIntTest.createEntity(em);
        em.persist(familiares);
        em.flush();
        personaje.addFamiliares(familiares);
        personajeRepository.saveAndFlush(personaje);
        Long familiaresId = familiares.getId();

        // Get all the personajeList where familiares equals to familiaresId
        defaultPersonajeShouldBeFound("familiaresId.equals=" + familiaresId);

        // Get all the personajeList where familiares equals to familiaresId + 1
        defaultPersonajeShouldNotBeFound("familiaresId.equals=" + (familiaresId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByEstudiosIsEqualToSomething() throws Exception {
        // Initialize the database
        EstudioPersonaje estudios = EstudioPersonajeResourceIntTest.createEntity(em);
        em.persist(estudios);
        em.flush();
        personaje.addEstudios(estudios);
        personajeRepository.saveAndFlush(personaje);
        Long estudiosId = estudios.getId();

        // Get all the personajeList where estudios equals to estudiosId
        defaultPersonajeShouldBeFound("estudiosId.equals=" + estudiosId);

        // Get all the personajeList where estudios equals to estudiosId + 1
        defaultPersonajeShouldNotBeFound("estudiosId.equals=" + (estudiosId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByAsociacionesIsEqualToSomething() throws Exception {
        // Initialize the database
        AsociacionPersonaje asociaciones = AsociacionPersonajeResourceIntTest.createEntity(em);
        em.persist(asociaciones);
        em.flush();
        personaje.addAsociaciones(asociaciones);
        personajeRepository.saveAndFlush(personaje);
        Long asociacionesId = asociaciones.getId();

        // Get all the personajeList where asociaciones equals to asociacionesId
        defaultPersonajeShouldBeFound("asociacionesId.equals=" + asociacionesId);

        // Get all the personajeList where asociaciones equals to asociacionesId + 1
        defaultPersonajeShouldNotBeFound("asociacionesId.equals=" + (asociacionesId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByPartidosIsEqualToSomething() throws Exception {
        // Initialize the database
        PartidoPersonaje partidos = PartidoPersonajeResourceIntTest.createEntity(em);
        em.persist(partidos);
        em.flush();
        personaje.addPartidos(partidos);
        personajeRepository.saveAndFlush(personaje);
        Long partidosId = partidos.getId();

        // Get all the personajeList where partidos equals to partidosId
        defaultPersonajeShouldBeFound("partidosId.equals=" + partidosId);

        // Get all the personajeList where partidos equals to partidosId + 1
        defaultPersonajeShouldNotBeFound("partidosId.equals=" + (partidosId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByReligionesIsEqualToSomething() throws Exception {
        // Initialize the database
        ReligionPersonaje religiones = ReligionPersonajeResourceIntTest.createEntity(em);
        em.persist(religiones);
        em.flush();
        personaje.addReligiones(religiones);
        personajeRepository.saveAndFlush(personaje);
        Long religionesId = religiones.getId();

        // Get all the personajeList where religiones equals to religionesId
        defaultPersonajeShouldBeFound("religionesId.equals=" + religionesId);

        // Get all the personajeList where religiones equals to religionesId + 1
        defaultPersonajeShouldNotBeFound("religionesId.equals=" + (religionesId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByResidenciasIsEqualToSomething() throws Exception {
        // Initialize the database
        ResidenciaPersonaje residencias = ResidenciaPersonajeResourceIntTest.createEntity(em);
        em.persist(residencias);
        em.flush();
        personaje.addResidencias(residencias);
        personajeRepository.saveAndFlush(personaje);
        Long residenciasId = residencias.getId();

        // Get all the personajeList where residencias equals to residenciasId
        defaultPersonajeShouldBeFound("residenciasId.equals=" + residenciasId);

        // Get all the personajeList where residencias equals to residenciasId + 1
        defaultPersonajeShouldNotBeFound("residenciasId.equals=" + (residenciasId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonajesByCargosIsEqualToSomething() throws Exception {
        // Initialize the database
        CargoPersonaje cargos = CargoPersonajeResourceIntTest.createEntity(em);
        em.persist(cargos);
        em.flush();
        personaje.addCargos(cargos);
        personajeRepository.saveAndFlush(personaje);
        Long cargosId = cargos.getId();

        // Get all the personajeList where cargos equals to cargosId
        defaultPersonajeShouldBeFound("cargosId.equals=" + cargosId);

        // Get all the personajeList where cargos equals to cargosId + 1
        defaultPersonajeShouldNotBeFound("cargosId.equals=" + (cargosId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultPersonajeShouldBeFound(String filter) throws Exception {
        restPersonajeMockMvc.perform(get("/api/personajes?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].fechaDefuncion").value(hasItem(DEFAULT_FECHA_DEFUNCION.toString())))
            .andExpect(jsonPath("$.[*].nombresAlternativos").value(hasItem(DEFAULT_NOMBRES_ALTERNATIVOS.toString())))
            .andExpect(jsonPath("$.[*].apellidosAlternativos").value(hasItem(DEFAULT_APELLIDOS_ALTERNATIVOS.toString())))
            .andExpect(jsonPath("$.[*].sexo").value(hasItem(DEFAULT_SEXO.booleanValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultPersonajeShouldNotBeFound(String filter) throws Exception {
        restPersonajeMockMvc.perform(get("/api/personajes?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingPersonaje() throws Exception {
        // Get the personaje
        restPersonajeMockMvc.perform(get("/api/personajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersonaje() throws Exception {
        // Initialize the database
        personajeService.save(personaje);

        int databaseSizeBeforeUpdate = personajeRepository.findAll().size();

        // Update the personaje
        Personaje updatedPersonaje = personajeRepository.findOne(personaje.getId());
        // Disconnect from session so that the updates on updatedPersonaje are not directly saved in db
        em.detach(updatedPersonaje);
        updatedPersonaje
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .fechaDefuncion(UPDATED_FECHA_DEFUNCION)
            .nombresAlternativos(UPDATED_NOMBRES_ALTERNATIVOS)
            .apellidosAlternativos(UPDATED_APELLIDOS_ALTERNATIVOS)
            .sexo(UPDATED_SEXO)
            .observaciones(UPDATED_OBSERVACIONES);

        restPersonajeMockMvc.perform(put("/api/personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPersonaje)))
            .andExpect(status().isOk());

        // Validate the Personaje in the database
        List<Personaje> personajeList = personajeRepository.findAll();
        assertThat(personajeList).hasSize(databaseSizeBeforeUpdate);
        Personaje testPersonaje = personajeList.get(personajeList.size() - 1);
        assertThat(testPersonaje.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
        assertThat(testPersonaje.getFechaDefuncion()).isEqualTo(UPDATED_FECHA_DEFUNCION);
        assertThat(testPersonaje.getNombresAlternativos()).isEqualTo(UPDATED_NOMBRES_ALTERNATIVOS);
        assertThat(testPersonaje.getApellidosAlternativos()).isEqualTo(UPDATED_APELLIDOS_ALTERNATIVOS);
        assertThat(testPersonaje.isSexo()).isEqualTo(UPDATED_SEXO);
        assertThat(testPersonaje.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);

        // Validate the Personaje in Elasticsearch
        Personaje personajeEs = personajeSearchRepository.findOne(testPersonaje.getId());
        assertThat(personajeEs).isEqualToIgnoringGivenFields(testPersonaje);
    }

    @Test
    @Transactional
    public void updateNonExistingPersonaje() throws Exception {
        int databaseSizeBeforeUpdate = personajeRepository.findAll().size();

        // Create the Personaje

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPersonajeMockMvc.perform(put("/api/personajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personaje)))
            .andExpect(status().isCreated());

        // Validate the Personaje in the database
        List<Personaje> personajeList = personajeRepository.findAll();
        assertThat(personajeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePersonaje() throws Exception {
        // Initialize the database
        personajeService.save(personaje);

        int databaseSizeBeforeDelete = personajeRepository.findAll().size();

        // Get the personaje
        restPersonajeMockMvc.perform(delete("/api/personajes/{id}", personaje.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean personajeExistsInEs = personajeSearchRepository.exists(personaje.getId());
        assertThat(personajeExistsInEs).isFalse();

        // Validate the database is empty
        List<Personaje> personajeList = personajeRepository.findAll();
        assertThat(personajeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPersonaje() throws Exception {
        // Initialize the database
        personajeService.save(personaje);

        // Search the personaje
        restPersonajeMockMvc.perform(get("/api/_search/personajes?query=id:" + personaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].fechaDefuncion").value(hasItem(DEFAULT_FECHA_DEFUNCION.toString())))
            .andExpect(jsonPath("$.[*].nombresAlternativos").value(hasItem(DEFAULT_NOMBRES_ALTERNATIVOS.toString())))
            .andExpect(jsonPath("$.[*].apellidosAlternativos").value(hasItem(DEFAULT_APELLIDOS_ALTERNATIVOS.toString())))
            .andExpect(jsonPath("$.[*].sexo").value(hasItem(DEFAULT_SEXO.booleanValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Personaje.class);
        Personaje personaje1 = new Personaje();
        personaje1.setId(1L);
        Personaje personaje2 = new Personaje();
        personaje2.setId(personaje1.getId());
        assertThat(personaje1).isEqualTo(personaje2);
        personaje2.setId(2L);
        assertThat(personaje1).isNotEqualTo(personaje2);
        personaje1.setId(null);
        assertThat(personaje1).isNotEqualTo(personaje2);
    }
}
