package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Persona;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Persona entity.
 */
public interface PersonaSearchRepository extends ElasticsearchRepository<Persona, Long> {
}
