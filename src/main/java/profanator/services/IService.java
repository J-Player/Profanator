package profanator.services;

import org.bson.types.ObjectId;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IService<T> {

    Mono<T> findById(ObjectId id);
    Flux<T> findAll();

}
