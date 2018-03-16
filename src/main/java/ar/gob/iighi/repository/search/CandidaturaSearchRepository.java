package ar.gob.iighi.repository.search;

import ar.gob.iighi.domain.Candidatura;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Candidatura entity.
 */
public interface CandidaturaSearchRepository extends ElasticsearchRepository<Candidatura, Long> {
}
