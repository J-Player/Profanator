package profanator.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import profanator.domains.Item;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ItemRepository extends ReactiveMongoRepository<Item, ObjectId> {

    Mono<Item> findByName(String name);

    Flux<Item> findByProficiency(String proficiency);

}
