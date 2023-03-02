package profanator.repositories;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.data.repository.reactive.ReactiveSortingRepository;
import profanator.domains.Proficiency;

public interface ProficiencyRepository extends ReactiveCrudRepository<Proficiency, Long>,
        ReactiveSortingRepository<Proficiency, Long> {
}
