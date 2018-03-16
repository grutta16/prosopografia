package ar.gob.iighi.repository;

import ar.gob.iighi.domain.FamiliarPersonaje;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FamiliarPersonaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FamiliarPersonajeRepository extends JpaRepository<FamiliarPersonaje, Long> {

}
