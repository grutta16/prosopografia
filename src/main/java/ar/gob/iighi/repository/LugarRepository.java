package ar.gob.iighi.repository;

import ar.gob.iighi.domain.Lugar;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Lugar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LugarRepository extends JpaRepository<Lugar, Long> {

}
