package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.PartidoPersonaje;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PartidoPersonaje entity.
 */
public interface PartidoPersonajeSearchRepository extends ElasticsearchRepository<PartidoPersonaje, Long> {
}
