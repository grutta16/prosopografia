package ar.gob.iighi.repository;

import ar.gob.iighi.domain.DetCandidatura;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DetCandidatura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetCandidaturaRepository extends JpaRepository<DetCandidatura, Long> {

}
