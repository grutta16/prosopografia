package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Eleccion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Eleccion entity.
 */
public interface EleccionSearchRepository extends ElasticsearchRepository<Eleccion, Long> {
}
