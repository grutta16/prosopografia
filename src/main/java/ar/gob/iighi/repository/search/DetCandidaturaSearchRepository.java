package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.DetCandidatura;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DetCandidatura entity.
 */
public interface DetCandidaturaSearchRepository extends ElasticsearchRepository<DetCandidatura, Long> {
}
