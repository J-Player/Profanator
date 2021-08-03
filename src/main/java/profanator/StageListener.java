package profanator;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import profanator.controller.MainControllerFX;

import java.io.IOException;
import java.net.URL;

@Component
@RequiredArgsConstructor
public class StageListener implements ApplicationListener<StageReadyEvent> {

    private final ApplicationContext ac;

    @Override
    public void onApplicationEvent(StageReadyEvent stageReadyEvent) {
        try {
            Stage stage = stageReadyEvent.getStage();
            URL url = getClass().getResource("/gui/fxml/index.fxml");
            FXMLLoader loader = new FXMLLoader(url);
            loader.setControllerFactory(ac::getBean);
            Parent root = loader.load();
            ((MainControllerFX) loader.getController()).setStage(stage);
            root.getStylesheets().add("/gui/styles/style.css");
            Scene scene = new Scene(root);
            stage.getIcons().add(new Image("/gui/image/icon/app.png"));
            stage.setScene(scene);
            stage.setTitle("Profanator");
            stage.sizeToScene();
            stage.setMinHeight(root.minHeight(-1));
            stage.setMinWidth(root.minWidth(-1));
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
