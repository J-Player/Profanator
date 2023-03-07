package profanator.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import profanator.domains.Item;
import profanator.repositories.ItemRepository;
import profanator.services.IService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService implements IService<Item> {

    private final ItemRepository repository;

    private final IngredientService ingredientService;

    @Override
    public Mono<Item> findById(Long id) {
        return repository.findById(id);
    }

    public Mono<Item> findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public Flux<Item> findAll() {
        return repository.findAll();
    }

    public Flux<Item> findAllByProficiency(String proficiency) {
        return repository.findByProficiency(proficiency);
    }

    public Mono<List<Item>> getIngredients(String product) {
        return ingredientService.findByProduct(product)
                .flatMap(ingredient -> findByName(ingredient.getName())
                        .map(item -> item.withQuantity(ingredient.getQuantity())))
                .flatMap(item -> getIngredients(item.getName())
                        .map(item::withIngredients))
                .collectList();
    }

}
