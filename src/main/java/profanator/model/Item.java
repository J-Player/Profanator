package profanator.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(name = "item_uk", columnNames = {"proficiency", "name"})
})
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Item implements Serializable {

    @ManyToOne
    @JoinColumn(name = "proficiency", referencedColumnName = "name")
    private Proficiency proficiency;
    @Id
    @Column(name = "name")
    @EqualsAndHashCode.Include
    private String name;

    @Column(name = "qtbyproduction", nullable = false)
    private int qtByProduction;

    @Transient
    private List<Item> ingredients;
    @Transient
    private int quantity;

    @Transient
    private int restQt;

}
