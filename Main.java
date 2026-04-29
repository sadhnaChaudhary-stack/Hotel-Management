import java.io.*;
import java.net.*;
import java.sql.*;

public class Main {
  public static void main(String[] args) throws Exception {

    ServerSocket server = new ServerSocket(9090);
    System.out.println("Server started on port 9090...");

    while (true) {
      Socket socket = server.accept();

      BufferedReader in = new BufferedReader(
          new InputStreamReader(socket.getInputStream()));
      OutputStream out = socket.getOutputStream();

      String requestLine = in.readLine();
      System.out.println("Request: " + requestLine);

      String response = "Server Running";

      try {
        if (requestLine != null && requestLine.startsWith("GET")) {

          String path = requestLine.split(" ")[1];

          // 🟢 HOME CHECK
          if (path.equals("/")) {
            response = "Server is running...";
          }

          // 🟢 REGISTER API
          else if (path.startsWith("/register?")) {

            String query = path.split("\\?")[1];
            String[] pairs = query.split("&");

            String firstName = "";
            String lastName = "";
            String email = "";
            String phone = "";
            String password = "";

            for (String pair : pairs) {
              String[] keyValue = pair.split("=", 2);

              if (keyValue.length == 2) {
                String key = keyValue[0];
                String value = URLDecoder.decode(keyValue[1], "UTF-8");

                if (key.equals("first_name"))
                  firstName = value.trim();
                if (key.equals("last_name"))
                  lastName = value.trim();
                if (key.equals("email"))
                  email = value.trim();
                if (key.equals("phone"))
                  phone = value.trim();
                if (key.equals("password"))
                  password = value.trim();
              }
            }

            // 🔍 DEBUG (see what's coming)
            System.out.println("First Name: " + firstName);
            System.out.println("Last Name: " + lastName);
            System.out.println("Email: " + email);
            System.out.println("Phone: " + phone);
            System.out.println("Password: " + password);

            // 🟢 DATABASE INSERT
            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/hotel_db",
                "root",
                "S123@");

            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO users(first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)");

            ps.setString(1, firstName);
            ps.setString(2, lastName);
            ps.setString(3, email);
            ps.setString(4, phone);
            ps.setString(5, password);

            int result = ps.executeUpdate();

            if (result > 0) {
              response = "Registration Successful";
            } else {
              response = "Registration Failed";
            }

            ps.close();
            con.close();
          }
        }

      } catch (Exception e) {
        e.printStackTrace();
        response = "Server Error";
      }

      String httpResponse = "HTTP/1.1 200 OK\r\n" +
          "Content-Type: text/plain\r\n" +
          "Access-Control-Allow-Origin: *\r\n" +
          "Content-Length: " + response.length() + "\r\n" +
          "\r\n" +
          response;

      out.write(httpResponse.getBytes());
      out.flush();
      socket.close();
    }
  }
}