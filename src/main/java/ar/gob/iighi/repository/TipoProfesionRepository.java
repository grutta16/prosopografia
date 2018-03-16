package ar.gob.iighi.repository;

import ar.gob.iighi.domain.TipoProfesion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoProfesion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoProfesionRepository extends JpaRepository<TipoProfesion, Long> {

}
