package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.EstudioPersonaje;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EstudioPersonaje entity.
 */
public interface EstudioPersonajeSearchRepository extends ElasticsearchRepository<EstudioPersonaje, Long> {
}
