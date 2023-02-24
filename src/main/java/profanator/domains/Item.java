package profanator.domains;

import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Data
public class Item implements Serializable {

    private UUID id;
    private String proficiency;
    private String name;
    private Integer qtByProduction;
    private List<Item> ingredients;
    private Integer quantity;
    private transient Integer restQt;

}
