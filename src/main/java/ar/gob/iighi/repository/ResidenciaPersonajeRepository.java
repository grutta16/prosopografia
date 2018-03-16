package ar.gob.iighi.repository;

import ar.gob.iighi.domain.ResidenciaPersonaje;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResidenciaPersonaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResidenciaPersonajeRepository extends JpaRepository<ResidenciaPersonaje, Long> {

}
