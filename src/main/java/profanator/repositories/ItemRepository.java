package profanator.repositories;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.data.repository.reactive.ReactiveSortingRepository;
import profanator.domains.Item;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ItemRepository extends ReactiveCrudRepository<Item, Long>,
        ReactiveSortingRepository<Item, Long> {

    Mono<Item> findByName(String name);

    Flux<Item> findByProficiency(String proficiency);

}
