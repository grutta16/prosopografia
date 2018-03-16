package ar.gob.iighi.repository;

import ar.gob.iighi.domain.RelacionFamiliar;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RelacionFamiliar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RelacionFamiliarRepository extends JpaRepository<RelacionFamiliar, Long> {

}
