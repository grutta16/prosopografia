package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.TipoProfesion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TipoProfesion entity.
 */
public interface TipoProfesionSearchRepository extends ElasticsearchRepository<TipoProfesion, Long> {
}
