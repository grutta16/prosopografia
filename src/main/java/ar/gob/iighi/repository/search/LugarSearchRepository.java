package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Lugar;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Lugar entity.
 */
public interface LugarSearchRepository extends ElasticsearchRepository<Lugar, Long> {
}
