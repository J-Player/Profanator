package profanator.domains;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ingredients")
public class Ingredient {

    private ObjectId id;
    private String product;
    private String name;
    private Integer quantity;

}
