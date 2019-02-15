package ar.gob.iighi.repository;

import ar.gob.iighi.domain.CargoPersonaje;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CargoPersonaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CargoPersonajeRepository extends JpaRepository<CargoPersonaje, Long> {

}
