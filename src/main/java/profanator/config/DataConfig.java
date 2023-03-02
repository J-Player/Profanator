package profanator.config;

import io.r2dbc.spi.ConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.r2dbc.connection.init.ConnectionFactoryInitializer;
import org.springframework.r2dbc.connection.init.ResourceDatabasePopulator;

@Configuration
public class DataConfig {

    @Bean
    public ConnectionFactoryInitializer initializer(ConnectionFactory connectionFactory) {
        ResourceDatabasePopulator populator = new ResourceDatabasePopulator(
                new ClassPathResource("data/schema.sql"),
                new ClassPathResource("data/data.sql"));
        ConnectionFactoryInitializer initializer = new ConnectionFactoryInitializer();
        initializer.setConnectionFactory(connectionFactory);
        initializer.setDatabasePopulator(populator);
        return initializer;
    }

}
