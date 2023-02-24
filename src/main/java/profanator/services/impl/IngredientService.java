package profanator.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import profanator.domains.Ingredient;
import profanator.services.IService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IngredientService implements IService<Ingredient> {

    private final WebClient webClient;

    @Override
    public Mono<Ingredient> findById(UUID id) {
        return webClient.get()
                .uri("/{id}", id)
                .retrieve()
                .bodyToMono(Ingredient.class);
    }

    @Override
    public Flux<Ingredient> findAll() {
        return webClient.get()
                .retrieve()
                .bodyToFlux(Ingredient.class);
    }

}
