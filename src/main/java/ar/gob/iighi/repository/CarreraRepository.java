package ar.gob.iighi.repository;

import ar.gob.iighi.domain.Carrera;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Carrera entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarreraRepository extends JpaRepository<Carrera, Long> {

}
