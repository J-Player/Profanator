package profanator.domains;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Ingredient {

    private Long id;
    private String product;
    private String name;
    private Integer quantity;

}
