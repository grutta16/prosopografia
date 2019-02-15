package ar.gob.iighi.repository;

import ar.gob.iighi.domain.PartidoPersonaje;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PartidoPersonaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartidoPersonajeRepository extends JpaRepository<PartidoPersonaje, Long> {

}
