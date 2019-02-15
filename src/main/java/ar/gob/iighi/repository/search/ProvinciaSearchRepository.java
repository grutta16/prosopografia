package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Provincia;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Provincia entity.
 */
public interface ProvinciaSearchRepository extends ElasticsearchRepository<Provincia, Long> {
}
