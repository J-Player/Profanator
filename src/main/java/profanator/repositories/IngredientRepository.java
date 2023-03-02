package profanator.repositories;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.data.repository.reactive.ReactiveSortingRepository;
import profanator.domains.Ingredient;
import reactor.core.publisher.Flux;

public interface IngredientRepository extends ReactiveCrudRepository<Ingredient, Long>,
        ReactiveSortingRepository<Ingredient, Long> {

    Flux<Ingredient> findByProduct(String product);

}
