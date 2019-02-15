package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.ResidenciaPersonaje;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ResidenciaPersonaje entity.
 */
public interface ResidenciaPersonajeSearchRepository extends ElasticsearchRepository<ResidenciaPersonaje, Long> {
}
