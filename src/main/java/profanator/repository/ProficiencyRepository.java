package profanator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import profanator.model.Proficiency;

@Repository
public interface ProficiencyRepository extends JpaRepository<Proficiency, String> {

}
