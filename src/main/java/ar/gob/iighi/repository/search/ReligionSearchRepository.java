package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Religion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Religion entity.
 */
public interface ReligionSearchRepository extends ElasticsearchRepository<Religion, Long> {
}
