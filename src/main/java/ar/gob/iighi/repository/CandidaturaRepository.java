package ar.gob.iighi.repository;

import ar.gob.iighi.domain.Candidatura;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Candidatura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CandidaturaRepository extends JpaRepository<Candidatura, Long> {

}
