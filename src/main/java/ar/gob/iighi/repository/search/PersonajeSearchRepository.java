package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Personaje;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Personaje entity.
 */
public interface PersonajeSearchRepository extends ElasticsearchRepository<Personaje, Long> {
}
