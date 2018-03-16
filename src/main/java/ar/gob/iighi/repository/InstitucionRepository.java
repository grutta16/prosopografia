package ar.gob.iighi.repository;

import ar.gob.iighi.domain.Institucion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Institucion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InstitucionRepository extends JpaRepository<Institucion, Long> {
    @Query("select distinct institucion from Institucion institucion left join fetch institucion.carreras")
    List<Institucion> findAllWithEagerRelationships();

    @Query("select institucion from Institucion institucion left join fetch institucion.carreras where institucion.id =:id")
    Institucion findOneWithEagerRelationships(@Param("id") Long id);

}
