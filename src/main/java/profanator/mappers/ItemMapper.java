package profanator.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import profanator.domains.Item;
import profanator.domains.dtos.ItemDTO;

@Mapper(componentModel = "spring")
public abstract class ItemMapper {

    public static final ItemMapper INSTANCE = Mappers.getMapper(ItemMapper.class);

    @Mapping(target = "ingredients", ignore = true)
    @Mapping(target = "quantity", ignore = true)
    @Mapping(target = "restQt", ignore = true)
    public abstract Item toItem(ItemDTO itemDTO);

}
