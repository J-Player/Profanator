package profanator.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import profanator.model.Proficiency;
import profanator.repository.ProficiencyRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
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
        for (Proficiency proficiency : proficiencies)
            list.add(proficiency.getName());
        return list;
    }

}
