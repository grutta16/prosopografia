package ar.gob.iighi.repository;

import ar.gob.iighi.domain.Asociacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Asociacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsociacionRepository extends JpaRepository<Asociacion, Long> {

}
