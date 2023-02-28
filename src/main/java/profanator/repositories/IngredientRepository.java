package profanator.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import profanator.domains.Ingredient;
import reactor.core.publisher.Flux;

public interface IngredientRepository extends ReactiveMongoRepository<Ingredient, ObjectId> {

    Flux<Ingredient> findByProduct(String product);

}
