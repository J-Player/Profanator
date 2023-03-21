package services;

import configs.BlockHoundTest;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import profanator.domains.Ingredient;
import profanator.repositories.IngredientRepository;
import profanator.services.impl.IngredientService;
import reactor.blockhound.BlockHound;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import utils.IngredientCreator;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;

@ExtendWith(SpringExtension.class)
@DisplayName("Ingredient Service Test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class IngredientServiceTest {

    @InjectMocks
    private IngredientService itemService;

    @Mock
    private IngredientRepository ingredientRepository;

    private final Ingredient ingredient = IngredientCreator.ingredient();

    @BeforeAll
    static void beforeAll() {
        BlockHound.install();
    }

    @BeforeEach
    void setUp() {
        BDDMockito.when(ingredientRepository.findById(anyLong()))
                .thenReturn(Mono.just(ingredient));
        BDDMockito.when(ingredientRepository.findAll())
                .thenReturn(Flux.just(ingredient));
        BDDMockito.when(ingredientRepository.findByProduct(anyString()))
                .thenReturn(Flux.just(ingredient));
    }

    @Test
    @Order(0)
    @DisplayName("[BlockHound] Check if BlockHound is working")
    void blockHoundWorks() {
        BlockHoundTest.test();
    }

    @Test
    @Order(1)
    @DisplayName("[findById] | Returns a ingredient by ID.")
    void findById() {
        StepVerifier.create(itemService.findById(ingredient.getId()))
                .expectSubscription()
                .expectNext(ingredient)
                .verifyComplete();
    }

    @Test
    @Order(2)
    @DisplayName("[findAll] | Returns all ingredients.")
    void findAll() {
        StepVerifier.create(itemService.findAll())
                .expectSubscription()
                .expectNext(ingredient)
                .verifyComplete();
    }

    @Test
    @Order(3)
    @DisplayName("[findByProduct] | Returns all ingredients from a item.")
    void findByProduct() {
        StepVerifier.create(itemService.findByProduct(ingredient.getProduct()))
                .expectSubscription()
                .expectNext(ingredient)
                .verifyComplete();
    }

}
