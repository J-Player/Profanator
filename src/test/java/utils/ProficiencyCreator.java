package utils;

import profanator.domains.Proficiency;

public class ProficiencyCreator {

    public static Proficiency proficiency() {
        return Proficiency.builder()
                .id(1L)
                .name("Proficiency")
                .build();
    }

}
