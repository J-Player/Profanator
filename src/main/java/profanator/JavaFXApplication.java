package profanator;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.stage.Stage;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.GenericApplicationContext;

public class JavaFXApplication extends Application {

    private ConfigurableApplicationContext applicationContext;

    @Override
    public void init() {
        ApplicationContextInitializer<GenericApplicationContext> initializer =
                ac -> {
                    ac.registerBean(Application.class, () -> JavaFXApplication.this);
                    ac.registerBean(Parameters.class, this::getParameters);
//                    ac.registerBean(HostServices.class, this::getHostServices);
                };
        applicationContext = new SpringApplicationBuilder()
                .sources(Main.class)
                .initializers(initializer)
                .run(getParameters().getRaw().toArray(new String[0]));
    }

    @Override
    public void stop() {
        applicationContext.close();
        Platform.exit();
    }

    @Override
    public void start(Stage stage) {
        applicationContext.publishEvent(new StageReadyEvent(stage));
    }

}

class StageReadyEvent extends ApplicationEvent {

    public StageReadyEvent(Stage source) {
        super(source);
    }

    public Stage getStage() {
        return (Stage) getSource();
    }

}
