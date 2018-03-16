package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.ParejaPersonaje;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ParejaPersonaje entity.
 */
public interface ParejaPersonajeSearchRepository extends ElasticsearchRepository<ParejaPersonaje, Long> {
}
