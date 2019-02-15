package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.CargoPersonaje;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CargoPersonaje entity.
 */
public interface CargoPersonajeSearchRepository extends ElasticsearchRepository<CargoPersonaje, Long> {
}
