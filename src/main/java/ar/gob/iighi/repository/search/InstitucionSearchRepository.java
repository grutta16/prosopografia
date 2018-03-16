package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Institucion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Institucion entity.
 */
public interface InstitucionSearchRepository extends ElasticsearchRepository<Institucion, Long> {
}
