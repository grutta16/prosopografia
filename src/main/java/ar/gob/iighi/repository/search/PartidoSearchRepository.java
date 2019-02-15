package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Partido;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Partido entity.
 */
public interface PartidoSearchRepository extends ElasticsearchRepository<Partido, Long> {
}
