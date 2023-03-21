package utils;

import profanator.domains.Ingredient;

public class IngredientCreator {

    public static Ingredient ingredient() {
        return Ingredient.builder()
                .id(1L)
                .product("product")
                .name("name")
                .quantity(1)
                .build();
    }
    
}
