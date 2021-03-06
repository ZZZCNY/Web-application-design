package com.example.demo5;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;

@WebServlet(name = "TopServlet", value = "/TopServlet")
public class TopServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        try {
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo5", "root", "20010323");
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT top FROM huati WHERE id = '" + id + "'");
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                if (resultSet.getString(1).equals("0")) {
                    preparedStatement = connection.prepareStatement("UPDATE huati SET top = 1 WHERE id = '" + id + "'");
                } else {
                    preparedStatement = connection.prepareStatement("UPDATE huati SET top = 0 WHERE id = '" + id + "'");
                }
                preparedStatement.executeUpdate();
            }
            resultSet.close();
            preparedStatement.close();
            connection.close();
            response.setHeader("refresh", "0;url=main.jsp?id=" + request.getParameter("userid"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
