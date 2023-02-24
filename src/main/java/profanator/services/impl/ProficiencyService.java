package profanator.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import profanator.domains.Proficiency;
import profanator.services.IService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProficiencyService implements IService<Proficiency> {

    private final WebClient webClient;

    @Override
    public Mono<Proficiency> findById(UUID id) {
        return webClient.get()
                .uri("/{id}", id)
                .retrieve()
                .bodyToMono(Proficiency.class);
    }

    @Override
    public Flux<Proficiency> findAll() {
        return webClient.get()
                .retrieve()
                .bodyToFlux(Proficiency.class);
    }

}
