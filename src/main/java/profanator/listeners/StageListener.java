package profanator.listeners;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Component;
import profanator.controllers.MainControllerFX;
import profanator.events.StageReadyEvent;

import java.io.IOException;

@Slf4j
@Component
public class StageListener implements ApplicationListener<StageReadyEvent> {

    @Autowired
    private ConfigurableApplicationContext context;

    @Override
    public void onApplicationEvent(StageReadyEvent event) {
        Stage stage = event.getStage();
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/gui/fxml/index.fxml"));
            loader.setControllerFactory(clazz -> context.getBean(clazz));
            Parent root = loader.load();
            Scene scene = new Scene(root);
            scene.getStylesheets().add(getClass().getResource("/gui/styles/style.css").toExternalForm());
            MainControllerFX controller = loader.getController();
            controller.setStage(stage);
            stage.setTitle("Profanator");
            stage.getIcons().add(new Image(getClass().getResource("/gui/image/icon/app.png").toExternalForm()));
            stage.setScene(scene);
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
