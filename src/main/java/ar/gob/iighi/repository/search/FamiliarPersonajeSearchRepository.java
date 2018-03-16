package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.FamiliarPersonaje;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FamiliarPersonaje entity.
 */
public interface FamiliarPersonajeSearchRepository extends ElasticsearchRepository<FamiliarPersonaje, Long> {
}
