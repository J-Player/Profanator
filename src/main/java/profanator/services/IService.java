package profanator.services;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IService<T> {

    Mono<T> findById(Long id);
    Flux<T> findAll();

}
