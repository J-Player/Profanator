package profanator.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(name = "id_index_uk", columnNames = {"id", "index"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Ingredient {

    @EmbeddedId
    @EqualsAndHashCode.Include
    private IngredientId id;

    @Column(nullable = false)
    private int quantity;

    private int index;

}
