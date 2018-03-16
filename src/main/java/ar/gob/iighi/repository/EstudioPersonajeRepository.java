package ar.gob.iighi.repository;

import ar.gob.iighi.domain.EstudioPersonaje;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EstudioPersonaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstudioPersonajeRepository extends JpaRepository<EstudioPersonaje, Long> {

}
