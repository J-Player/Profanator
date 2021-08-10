package profanator.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import profanator.exception.ItemNotFoundException;
import profanator.model.Ingredient;
import profanator.model.Item;
import profanator.repository.ItemRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService extends AbstractService<Item, String> {

    private final ItemRepository itemRepository;
    private final IngredientService ingredientService;

    @Override
    public void delete(Item item) {
        itemRepository.delete(item);
    }

    @Override
    public void deleteById(String id) {
        itemRepository.deleteById(id);
    }

    @Override
    public void update(Item item) {
        itemRepository.save(item);
    }

    public Item findByName(String name) {
        Item item = itemRepository.findById(name)
                .orElseThrow(() -> new ItemNotFoundException(name));
        item.setIngredients(getIngredientsOf(item));
        return item;
    }

    public List<Item> getIngredientsOf(Item item) {
        List<Item> items = new ArrayList<>();
        List<Ingredient> ingredients = ingredientService.findById(item);
        if (!ingredients.isEmpty()) {
            for (Ingredient ingredient : ingredients) {
                Item aux = findByName(ingredient.getId().getIngredient().getName());
                aux.setQuantity(ingredient.getQuantity());
                aux.setIngredients(getIngredientsOf(aux));
                items.add(aux);
            }
        }
        return items;
    }

    public List<String> findAllItemNameByProficiency(String proficiency) {
        return itemRepository.findByProficiencyName(proficiency).stream()
                .map(Item::getName)
                .collect(Collectors.toList());
    }

}
