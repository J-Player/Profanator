package profanator;

import javax.swing.*;
import java.awt.*;

public class GUI extends JFrame {

    public GUI() {
        super("Minha Interface");
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setSize(255, 325);
        setLocationRelativeTo(null);
        setResizable(false);

        JPanel panel = new JPanel(new GridBagLayout());
        GridBagConstraints c = new GridBagConstraints();
        c.gridx = 0;
        c.gridy = 0;
        c.gridwidth = 2;
        c.insets = new Insets(0,0,10,0);
        JComboBox<String> combo1 = new JComboBox<>(new String[]{"Opção 1", "Opção 2", "Opção 3"});
        panel.add(combo1, c);
        c.gridy = 1;
        JComboBox<String> combo2 = new JComboBox<>(new String[]{"Opção 1", "Opção 2", "Opção 3"});
        panel.add(combo2, c);
        c.gridy = 2;
        c.gridwidth = 1;
        c.insets = new Insets(10,0,0,0);
        JTextField textField = new JTextField();
        panel.add(textField, c);
        c.gridx = 1;
        c.insets = new Insets(10,10,0,0);
        JButton button = new JButton("OK");
        panel.add(button, c);

        add(panel);

        setVisible(true);
    }

    public static void main(String[] args) {
        new GUI();
    }

}
