/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package MainServlet;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 *
 * @author user
 */
public class connectionProvider {

    private static Connection con;

    public static Connection getConnection() {
        try {
            if (con == null) {
                Class.forName("com.mysql.cj.jdbc.Driver");

                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/highradius","root","7903271879prem");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return con;
    }
}
