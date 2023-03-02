package profanator;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;

/**
 * <p>Autor: João Pedro R. Diniz</p>
 * <p>Data de criação: 2 de março de 2019</p>
 * <p>Data de Lançamento: ?</p>
 * <p>Versão atual: 0.0.1</p>
 */
@SpringBootApplication
public class Main extends JFrame {

    public Main() {
        initUI();
    }

    private void initUI() {
        JButton quitButton = new JButton("Quit");
        quitButton.addActionListener((ActionEvent event) -> System.exit(0));
        createLayout(quitButton);
        setTitle("Quit button");
        setSize(300, 200);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }

    private void createLayout(JComponent... arg) {
        Container pane = getContentPane();
        GroupLayout gl = new GroupLayout(pane);
        pane.setLayout(gl);
        gl.setAutoCreateContainerGaps(true);
        gl.setHorizontalGroup(gl.createSequentialGroup()
                .addComponent(arg[0]));
        gl.setVerticalGroup(gl.createSequentialGroup()
                .addComponent(arg[0]));
    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = new SpringApplicationBuilder(Main.class)
                .headless(false).run(args);
        EventQueue.invokeLater(() -> {
            Main ex = ctx.getBean(Main.class);
            ex.setVisible(true);
        });
    }

}
