package profanator.controllers;

import javafx.beans.binding.BooleanBinding;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.Node;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import profanator.domains.Item;
import profanator.domains.Proficiency;
import profanator.services.impl.ItemService;
import profanator.services.impl.ProficiencyService;
import profanator.utils.Crafter;

import java.io.IOException;
import java.io.InputStream;

import static javafx.collections.FXCollections.observableList;

@Slf4j
@Component
public class MainControllerFX {

    @FXML
    private StackPane stackPane;

    @FXML
    private ImageView itemImageView;

    @FXML
    private ComboBox<String> proficiencyComboBox;

    @FXML
    private ComboBox<String> itemComboBox;

    @FXML
    private Button calculateButton;

    @FXML
    private TextField quantityTextField;

    @FXML
    private Label creatorLabel;

    @FXML
    private TreeView<String> treeView;

    @FXML
    private Button backButton;

    @FXML
    private CheckMenuItem aoTCheckMenuItem;

    @Setter
    private Stage stage;

    @Autowired
    private ProficiencyService proficiencyService;

    @Autowired
    private ItemService itemService;

    public void initialize() {
        aoTCheckMenuItem.selectedProperty().addListener(event -> stage.setAlwaysOnTop(aoTCheckMenuItem.isSelected()));

        proficiencyService.findAll(Sort.by("name"))
                .map(Proficiency::getName)
                .collectList()
                .doOnSuccess(proficiencies -> proficiencyComboBox.setItems(observableList(proficiencies)))
                .subscribe();

        proficiencyComboBox.valueProperty().addListener((observable, oldValue, newValue) ->
                itemService.findAllByProficiency(newValue)
                        .map(Item::getName)
                        .collectList()
                        .doOnSuccess(items -> itemComboBox.setItems(observableList(items)))
                        .subscribe());

        itemComboBox.disableProperty().bind(proficiencyComboBox.valueProperty().isNull());
        itemComboBox.valueProperty().addListener(event -> {
            String proficiency = proficiencyComboBox.getValue();
            String itemName = itemComboBox.getValue();
            if (itemName != null) itemImageView.setImage(changeImage(proficiency, itemName));
        });
        proficiencyComboBox.setEditable(false);
        itemComboBox.setEditable(false);
        quantityTextField.textProperty().addListener((observable, oldValue, newValue) -> {
            if (!newValue.matches("\\d*"))
                quantityTextField.setText(newValue.replaceAll("[^\\d]", ""));
            if (quantityTextField.getText().length() > 7)
                quantityTextField.setText(quantityTextField.getText().substring(0, 7));
        });
        BooleanBinding itemBB = itemComboBox.getSelectionModel().selectedItemProperty().isNull();
        BooleanBinding qtBB = quantityTextField.textProperty().isEmpty();
        calculateButton.disableProperty().bind(itemBB.or(qtBB));
        calculateButton.setOnAction(event -> calculate());
        creatorLabel.setText("Created by Kaveira");
        Tooltip tooltip = new Tooltip("Made with love \u2665");
        tooltip.setStyle("-fx-background-color: #000000; -fx-text-fill: #430C5F;");
        creatorLabel.setTooltip(tooltip);
        backButton.setOnAction(event -> {
            changeTop();
            treeView.setRoot(null);
        });
    }

    private void calculate() {
        final String itemName = itemComboBox.valueProperty().get();
        int qt = Integer.parseInt(quantityTextField.getText());
        itemService.findByName(itemName)
                .zipWith(itemService.getIngredients(itemName))
                .map(tuple2 -> tuple2.getT1()
                        .withQuantity(qt)
                        .withIngredients(tuple2.getT2()))
                .map(Crafter::calculate)
                .doOnSubscribe(s -> quantityTextField.setText(""))
                .doOnSuccess(this::getResult)
                .subscribe();
    }

    private Image changeImage(String proficiency, String itemname) {
        itemname = itemname.replaceAll("\\s", "_");
        String value = "/gui/image/item/";
        if (proficiency != null) {
            value = value.concat("%s/%s.png");
            value = String.format(value, proficiency, itemname);
        } else {
            value = value.concat("%s.png");
            value = String.format(value, itemname);
        }
        try (InputStream in = getClass().getResourceAsStream(value.toLowerCase())) {
            if (in == null) return null;
            return new Image(in);
        } catch (IOException e) {
            log.error("Error ao carregar image: [{}] {}", e.getClass().getSimpleName(), e.getMessage());
            return null;
        }
    }

    private void changeTop() {
        ObservableList<Node> childs = this.stackPane.getChildren();
        if (childs.size() > 1) {
            Node topNode = childs.get(childs.size() - 1);
            Node newTopNode = childs.get(childs.size() - 2);
            topNode.setVisible(false);
            topNode.toBack();
            newTopNode.setVisible(true);
        }
    }

    private void getResult(Item item) {
        treeView.setRoot(buildResult(item));
        changeTop();
    }

    private TreeItem<String> buildResult(Item item) {
        String value = "[%s] x%d";
        String name = item.getName();
        Integer quantity = item.getQuantity();
        Integer restQt = item.getRestQt();
        value = String.format(value, name, quantity);
        if (restQt != null && restQt > 0)
            value = value.concat(String.format(" [rest: %s]", restQt));
        ImageView imageView = new ImageView();
        String proficiency = item.getProficiency();
        imageView.setImage(changeImage(proficiency, item.getName()));
        imageView.setFitHeight(20);
        imageView.setFitWidth(20);
        TreeItem<String> root = new TreeItem<>(value, imageView);
        root.setExpanded(true);
        if (item.getIngredients() != null && !item.getIngredients().isEmpty())
            item.getIngredients().forEach(ingredient -> root.getChildren().add(buildResult(ingredient)));
        else
            root.setValue(root.getValue().replaceAll("[\\[\\]]", ""));
        return root;
    }

}
