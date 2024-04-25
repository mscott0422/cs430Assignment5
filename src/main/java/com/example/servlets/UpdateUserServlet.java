// Authors: Mitchell Scott, Boone Losche, Corwin Paulsen

package com.example.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/update")
public class UpdateUserServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // JDBC URL, username, and password
    private static final String JDBC_URL = "jdbc:mysql://faure.cs.colostate.edu:3306/";
    private static final String JDBC_USERNAME = "";
    private static final String JDBC_PASSWORD = "";

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String UserID = request.getParameter("UserID");
        String UserName = request.getParameter("UserName");
        String UserType = request.getParameter("UserType");
        System.out.println("fetch: " + UserID + ", " + UserName + ", " + UserType);
        String result = null;
        Connection connection = null;
        PreparedStatement statement = null;
        int updateCommand;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {

            connection = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);

            String sql = "UPDATE Users SET UserName = ?, UserType = ? WHERE UserID = ?;";
            statement = connection.prepareStatement(sql);
            statement.setString(1, UserName);
            statement.setString(2, UserType);
            statement.setString(3, UserID);

            // Execute query
            updateCommand = statement.executeUpdate();

            if (updateCommand > 0) {
                System.out.println("Successful update");
                System.out.println(" Student ID: " + UserID + "\n Student Name: " + UserName + "\n Dept Name: "
                        + UserType);
                result = "User updated successfully";

            } else {
                System.out.println("Update was not successful");
                System.out.println(" Student ID: " + UserID + "\n Student Name: " + UserName + "\n Dept Name: "
                        + UserType);
                result = "Update was NOT successful";
            }

            // Process result set
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources
            try {
                if (statement != null)
                    statement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            try {
                if (connection != null)
                    connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        Gson gson = new Gson();
        String jsonResult = gson.toJson(result);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(jsonResult);
        out.flush();
    }
}
