package profanator.domains;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Item {

    @Id
    private Long id;
    private String proficiency;
    private String name;
    @Column("qtByProduction")
    private Integer qtByProduction;

    @Transient
    private List<Item> ingredients;

    @Transient
    private Integer quantity;

    @Transient
    private Integer restQt;

}
