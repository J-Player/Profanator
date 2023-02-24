package profanator.services;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface IService<T> {

    Mono<T> findById(UUID id);
    Flux<T> findAll();

}
