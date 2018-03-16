package ar.gob.iighi.repository;

import ar.gob.iighi.domain.Seccion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Seccion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeccionRepository extends JpaRepository<Seccion, Long> {

}
