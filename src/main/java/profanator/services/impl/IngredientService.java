package profanator.services.impl;

import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import profanator.domains.Ingredient;
import profanator.repositories.IngredientRepository;
import profanator.services.IService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class IngredientService implements IService<Ingredient> {

    private final IngredientRepository repository;

    @Override
    public Mono<Ingredient> findById(ObjectId id) {
        return repository.findById(id);
    }

    @Override
    public Flux<Ingredient> findAll() {
        return repository.findAll();
    }

    public Flux<Ingredient> findByProduct(String product) {
        return repository.findByProduct(product);
    }
}
