package ar.gob.iighi.repository;

import ar.gob.iighi.domain.ReligionPersonaje;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ReligionPersonaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReligionPersonajeRepository extends JpaRepository<ReligionPersonaje, Long> {

}
