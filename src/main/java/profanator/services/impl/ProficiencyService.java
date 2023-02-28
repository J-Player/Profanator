package profanator.services.impl;

import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import profanator.domains.Proficiency;
import profanator.repositories.ProficiencyRepository;
import profanator.services.IService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ProficiencyService implements IService<Proficiency> {

    private final ProficiencyRepository repository;

    @Override
    public Mono<Proficiency> findById(ObjectId id) {
        return repository.findById(id);
    }

    @Override
    public Flux<Proficiency> findAll() {
        return repository.findAll();
    }

    public Flux<Proficiency> findAll(Sort sort) {
        return repository.findAll(sort);
    }

}
