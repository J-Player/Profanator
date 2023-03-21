package services;

import configs.BlockHoundTest;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import profanator.domains.Proficiency;
import profanator.repositories.ProficiencyRepository;
import profanator.services.impl.ProficiencyService;
import reactor.blockhound.BlockHound;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import utils.ProficiencyCreator;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;

@ExtendWith(SpringExtension.class)
@DisplayName("Proficiency Service Test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProficiencyServiceTest {

    @InjectMocks
    private ProficiencyService proficiencyService;

    @Mock
    private ProficiencyRepository proficiencyRepository;

    private final Proficiency proficiency = ProficiencyCreator.proficiency();

    @BeforeAll
    static void blockHound() {
        BlockHound.install();
    }

    @BeforeEach
    void setUp() {
        BDDMockito.when(proficiencyRepository.findById(anyLong()))
                .thenReturn(Mono.just(proficiency));
        BDDMockito.when(proficiencyRepository.findAll())
                .thenReturn(Flux.just(proficiency));
        BDDMockito.when(proficiencyRepository.findAll(any(Sort.class)))
                .thenReturn(Flux.just(proficiency));
    }

    @Test
    @Order(0)
    @DisplayName("[BlockHound] Check if BlockHound is working")
    void blockHoundWorks() {
        BlockHoundTest.test();
    }

    @Test
    @Order(1)
    @DisplayName("[findById] | Return a proficiency.")
    void findById() {
        StepVerifier.create(proficiencyService.findById(proficiency.getId()))
                .expectSubscription()
                .expectNext(proficiency)
                .verifyComplete();
    }

    @Test
    @Order(2)
    @DisplayName("[findAll] | Returns all proficiencies.")
    void findAll() {
        StepVerifier.create(proficiencyService.findAll())
                .expectSubscription()
                .expectNext(proficiency)
                .verifyComplete();
    }

    @Test
    @Order(3)
    @DisplayName("[findAllSorted] | Returns all proficiencies sorted by some property.")
    void findAllSorted() {
        StepVerifier.create(proficiencyService.findAll(Sort.by("name")))
                .expectSubscription()
                .expectNext(proficiency)
                .verifyComplete();
    }

}
