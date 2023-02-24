package profanator.domains;

import lombok.Data;

import java.util.UUID;

@Data
public class Ingredient {

    private UUID id;
    private String product;
    private String name;
    private Integer quantity;

}
