package ar.gob.iighi.repository;

import ar.gob.iighi.domain.AsociacionPersonaje;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AsociacionPersonaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsociacionPersonajeRepository extends JpaRepository<AsociacionPersonaje, Long> {

}
