package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Cargo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Cargo entity.
 */
public interface CargoSearchRepository extends ElasticsearchRepository<Cargo, Long> {
}
