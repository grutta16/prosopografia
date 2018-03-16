package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Seccion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Seccion entity.
 */
public interface SeccionSearchRepository extends ElasticsearchRepository<Seccion, Long> {
}
