package profanator.domains.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ItemDTO {

    private UUID id;
    private String proficiency;
    private String name;
    private Integer qtByProduction;

}
