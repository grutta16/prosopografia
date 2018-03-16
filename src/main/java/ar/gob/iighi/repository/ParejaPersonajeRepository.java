package ar.gob.iighi.repository;

import ar.gob.iighi.domain.ParejaPersonaje;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ParejaPersonaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParejaPersonajeRepository extends JpaRepository<ParejaPersonaje, Long> {

}
