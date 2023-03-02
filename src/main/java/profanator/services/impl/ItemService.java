package profanator.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import profanator.domains.Item;
import profanator.repositories.ItemRepository;
import profanator.services.IService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ItemService implements IService<Item> {

    private final ItemRepository repository;

    @Override
    public Mono<Item> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Flux<Item> findAll() {
        return repository.findAll();
    }

    public Flux<Item> findAllByProficiency(String proficiency) {
        return repository.findByProficiency(proficiency);
    }

}
