package profanator.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import profanator.model.Item;

import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class Crafter implements Runnable {

    @NotNull
    private final Item item;

    @Override
    public void run() {
        calculate(item);
    }

    private void calculate(Item item) {
        if (item.getQtByProduction() > 1) {
            if (item.getQuantity() < item.getQtByProduction()) {
                item.setRestQt(item.getQtByProduction() - item.getQuantity());
                item.setQuantity(item.getQtByProduction());
            } else if ((item.getQuantity() % item.getQtByProduction()) != 0) {
                int newQuantity = (item.getQuantity() / item.getQtByProduction() + 1) * item.getQtByProduction();
                item.setRestQt(newQuantity - item.getQuantity());
                item.setQuantity(newQuantity);
            }
        }
        for (Item ingredient : item.getIngredients()) {
            ingredient.setQuantity(ingredient.getQuantity() * item.getQuantity() / item.getQtByProduction());
            if (!ingredient.getIngredients().isEmpty())
                calculate(ingredient);
        }
    }

}