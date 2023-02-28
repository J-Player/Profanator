package profanator.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import profanator.domains.Item;
import profanator.domains.Proficiency;

import java.util.UUID;

public interface ProficiencyRepository extends ReactiveMongoRepository<Proficiency, ObjectId> {
}
