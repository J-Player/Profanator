package profanator.domains;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "items")
public class Item {

    @Id
    private ObjectId id;
    private String proficiency;
    private String name;
    private Integer qtByProduction;

    @Transient
    private List<Item> ingredients;

    @Transient
    private Integer quantity;

    @Transient
    private Integer restQt;

}
