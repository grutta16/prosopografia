package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Asociacion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Asociacion entity.
 */
public interface AsociacionSearchRepository extends ElasticsearchRepository<Asociacion, Long> {
}
