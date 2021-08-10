package profanator.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import profanator.model.Ingredient;
import profanator.model.IngredientId;
import profanator.model.Item;
import profanator.repository.IngredientRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
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
        return ingredientRepository.findByIdIdOrderByIndexAsc(id);
    }

}
