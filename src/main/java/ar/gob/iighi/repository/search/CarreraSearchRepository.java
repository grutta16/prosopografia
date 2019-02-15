package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Carrera;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Carrera entity.
 */
public interface CarreraSearchRepository extends ElasticsearchRepository<Carrera, Long> {
}
