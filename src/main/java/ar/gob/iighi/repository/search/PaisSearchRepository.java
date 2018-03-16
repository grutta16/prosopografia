package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Pais;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Pais entity.
 */
public interface PaisSearchRepository extends ElasticsearchRepository<Pais, Long> {
}
