package ar.gob.iighi.repository;

import ar.gob.iighi.domain.Partido;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Partido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartidoRepository extends JpaRepository<Partido, Long> {

}
