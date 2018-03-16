package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.AsociacionPersonaje;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AsociacionPersonaje entity.
 */
public interface AsociacionPersonajeSearchRepository extends ElasticsearchRepository<AsociacionPersonaje, Long> {
}
