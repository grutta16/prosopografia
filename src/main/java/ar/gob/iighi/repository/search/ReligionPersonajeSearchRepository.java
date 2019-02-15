package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.ReligionPersonaje;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ReligionPersonaje entity.
 */
public interface ReligionPersonajeSearchRepository extends ElasticsearchRepository<ReligionPersonaje, Long> {
}
