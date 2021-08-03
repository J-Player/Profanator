package profanator.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class IngredientId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "id", referencedColumnName = "name")
    private Item id;
    @ManyToOne
    @JoinColumn(name = "ingredient", referencedColumnName = "name")
    private Item ingredient;

}
