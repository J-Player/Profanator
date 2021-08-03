package profanator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import profanator.model.Ingredient;
import profanator.model.IngredientId;
import profanator.model.Item;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, IngredientId> {

    List<Ingredient> findByIdId(Item id);

}
