package utils;

import profanator.domains.Item;

public class ItemCreator {

    public static Item item() {
        return Item.builder()
                .id(1L)
                .proficiency("Item")
                .name("Item")
                .qtByProduction(1)
                .quantity(1)
                .build();
    }
    
}
