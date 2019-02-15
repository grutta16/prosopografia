package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Profesion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Profesion entity.
 */
public interface ProfesionSearchRepository extends ElasticsearchRepository<Profesion, Long> {
}
