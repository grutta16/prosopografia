package ar.gob.iighi.repository;

import ar.gob.iighi.domain.Profesion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Profesion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfesionRepository extends JpaRepository<Profesion, Long> {

}
