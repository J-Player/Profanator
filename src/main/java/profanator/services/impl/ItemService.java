package profanator.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import profanator.domains.Item;
import profanator.services.IService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemService implements IService<Item> {

    private final WebClient webClient;

    @Override
    public Mono<Item> findById(UUID id) {
        return webClient.get()
                .uri("/{id}", id)
                .retrieve()
                .bodyToMono(Item.class);
    }

    @Override
    public Flux<Item> findAll() {
        return webClient.get()
                .uri("/all")
                .retrieve()
                .bodyToFlux(Item.class);
    }

    public Flux<Item> findAllByProficiency(String proficiency) {
        return webClient.get()
                .uri(builder -> builder
                        .path("/all")
                        .queryParam("proficiency", proficiency)
                        .build())
                .retrieve()
                .bodyToFlux(Item.class);
    }

    public Mono<Item> findByName(String name) {
        return webClient.get()
                .uri(builder -> builder
                        .queryParam("name", name)
                        .build())
                .retrieve()
                .bodyToMono(Item.class);
    }

}
