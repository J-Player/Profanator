package profanator.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import profanator.model.Proficiency;
import profanator.repository.ProficiencyRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProficiencyService extends AbstractService<Proficiency, String> {

    private final ProficiencyRepository proficiencyRepository;

    @Override
    public void delete(Proficiency proficiency) {
        proficiencyRepository.delete(proficiency);
    }

    @Override
    public void deleteById(String id) {
        proficiencyRepository.deleteById(id);
    }

    @Override
    public void update(Proficiency proficiency) {
        proficiencyRepository.save(proficiency);
    }

    public List<String> findAll() {
        List<Proficiency> proficiencies = proficiencyRepository.findAll();
        List<String> list = new ArrayList<>(proficiencies.size());
        proficiencies.forEach(proficiency -> list.add(proficiency.getName()));
        return list;
    }

}
