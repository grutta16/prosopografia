package ar.gob.iighi.repository;

import ar.gob.iighi.domain.Personaje;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Personaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonajeRepository extends JpaRepository<Personaje, Long>, JpaSpecificationExecutor<Personaje> {
    @Query("select distinct personaje from Personaje personaje left join fetch personaje.profesiones")
    List<Personaje> findAllWithEagerRelationships();

    @Query("select personaje from Personaje personaje left join fetch personaje.profesiones where personaje.id =:id")
    Personaje findOneWithEagerRelationships(@Param("id") Long id);

}
