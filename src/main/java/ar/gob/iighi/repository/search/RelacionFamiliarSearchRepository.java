package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.RelacionFamiliar;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the RelacionFamiliar entity.
 */
public interface RelacionFamiliarSearchRepository extends ElasticsearchRepository<RelacionFamiliar, Long> {
}
