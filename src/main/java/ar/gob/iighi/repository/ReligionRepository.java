package ar.gob.iighi.repository;

import ar.gob.iighi.domain.Religion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Religion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReligionRepository extends JpaRepository<Religion, Long> {

}
