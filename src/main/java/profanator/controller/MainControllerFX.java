package profanator.controller;

import javafx.beans.binding.BooleanBinding;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.Node;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import profanator.model.Item;
import profanator.service.ItemService;
import profanator.service.ProficiencyService;
import profanator.util.Crafter;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Autowired
    private ProficiencyService proficiencyService;
    @Autowired
    private ItemService itemService;

    private Stage stage;

    public void initialize() {
        aoTCheckMenuItem.selectedProperty().addListener((event) -> stage.setAlwaysOnTop(aoTCheckMenuItem.isSelected()));
        List<String> list = proficiencyService.findAll();
        proficiencyComboBox.setItems(FXCollections.observableList(list));
        proficiencyComboBox.disableProperty().bind(proficiencyComboBox.itemsProperty().isNull());
        Map<String, ObservableList<String>> items = new HashMap<>();
        for (String proficiency : proficiencyComboBox.getItems()) {
            List<String> itemList = itemService.findAllItemNameByProficiency(proficiency);
            items.put(proficiency, FXCollections.observableList(itemList));
        }
        proficiencyComboBox.valueProperty().addListener((observable, oldValue, newValue) -> {
            if (items.containsKey(newValue)) {
                itemComboBox.setItems(items.get(newValue));
                itemComboBox.setValue(items.get(newValue).get(0));
            }
        });
        itemComboBox.disableProperty().bind(proficiencyComboBox.valueProperty().isNull());
        itemComboBox.valueProperty().addListener(event -> {
            String proficiency = proficiencyComboBox.getValue();
            String itemname = itemComboBox.getValue();
            if (itemname != null) itemImageView.setImage(changeImage(proficiency, itemname));
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
        String name = itemComboBox.getValue();
        int quantity = Integer.parseInt(quantityTextField.getText());
        quantityTextField.setText("");
        quantity = quantity > 0 ? quantity : 1;
        Item item = itemService.findByName(name);
        item.setQuantity(quantity);
        Crafter crafter = new Crafter(item);
        Thread thread = new Thread(crafter);
        thread.start();
        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        item = crafter.getItem();
        getResult(item);
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
            if (in != null)
                return new Image(in);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
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
        int quantity = item.getQuantity();
        int restQt = item.getRestQt();
        value = String.format(value, name, quantity);
        if (restQt > 0)
            value = value.concat(String.format(" [rest: %s]", restQt));
        ImageView imageView = new ImageView();
        String proficiency = item.getProficiency() != null ? item.getProficiency().getName() : null;
        imageView.setImage(changeImage(proficiency, item.getName()));
        imageView.setFitHeight(20);
        imageView.setFitWidth(20);
        TreeItem<String> root = new TreeItem<>(value, imageView);
        root.setExpanded(true);
        if (item.getIngredients() != null && item.getIngredients().size() > 0)
            item.getIngredients().forEach(ingredient -> root.getChildren().add(buildResult(ingredient)));
        else
            root.setValue(root.getValue().replaceAll("[\\[\\]]", ""));
        return root;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

}
