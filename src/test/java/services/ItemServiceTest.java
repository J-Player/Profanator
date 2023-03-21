package services;

import configs.BlockHoundTest;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import profanator.domains.Item;
import profanator.repositories.ItemRepository;
import profanator.services.impl.ItemService;
import reactor.blockhound.BlockHound;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import utils.ItemCreator;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;

@DisplayName("Item Service Test")
@ExtendWith(SpringExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ItemServiceTest {

    @InjectMocks
    private ItemService itemService;

    @Mock
    private ItemRepository itemRepository;

    private final Item item = ItemCreator.item();

    @BeforeAll
    static void beforeAll() {
        BlockHound.install();
    }

    @BeforeEach
    void setUp() {
        BDDMockito.when(itemRepository.findById(anyLong()))
                .thenReturn(Mono.just(item));
        BDDMockito.when(itemRepository.findByName(anyString()))
                .thenReturn(Mono.just(item));
        BDDMockito.when(itemRepository.findAll())
                .thenReturn(Flux.just(item));
        BDDMockito.when(itemRepository.findByProficiency(anyString()))
                .thenReturn(Flux.just(item));
    }

    @Test
    @Order(0)
    @DisplayName("[BlockHound] Check if BlockHound is working")
    void blockHoundWorks() {
        BlockHoundTest.test();
    }

    @Test
    @Order(1)
    @DisplayName("[findById] | Returns a item by ID.")
    void findById() {
        StepVerifier.create(itemService.findById(item.getId()))
                .expectSubscription()
                .expectNext(item)
                .verifyComplete();
    }

    @Test
    @Order(2)
    @DisplayName("[findByName] | Returns a item by name.")
    void findByName() {
        StepVerifier.create(itemService.findByName(item.getName()))
                .expectSubscription()
                .expectNext(item)
                .verifyComplete();
    }

    @Test
    @Order(3)
    @DisplayName("[findAll] | Returns all items.")
    void findAll() {
        StepVerifier.create(itemService.findAll())
                .expectSubscription()
                .expectNext(item)
                .verifyComplete();
    }

    @Test
    @Order(4)
    @DisplayName("[findAllByProficiency] | Returns all items of a proficiency.")
    void findAllByProficiency() {
        StepVerifier.create(itemService.findAllByProficiency(item.getProficiency()))
                .expectSubscription()
                .expectNext(item)
                .verifyComplete();
    }

}
