package profanator.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Proficiency {

    @Id
    @Column
    private String name;

}
