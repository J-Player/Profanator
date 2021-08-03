package profanator.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import profanator.model.Ingredient;
import profanator.model.IngredientId;
import profanator.model.Item;
import profanator.repository.IngredientRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class IngredientService extends AbstractService<Ingredient, IngredientId> {

    private final IngredientRepository ingredientRepository;

    @Override
    public void delete(Ingredient ingredient) {
        ingredientRepository.delete(ingredient);
    }

    @Override
    public void deleteById(IngredientId id) {
        ingredientRepository.deleteById(id);
    }

    @Override
    public void update(Ingredient ingredient) {
        ingredientRepository.save(ingredient);
    }

    public List<Ingredient> findById(Item id) {
        return ingredientRepository.findByIdId(id);
    }

}
