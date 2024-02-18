// import java.sql.Connection;
// import java.sql.DriverManager;
// import java.sql.ResultSet;
// import java.sql.SQLException;
// import java.sql.Statement;
// import java.util.ArrayList;
// import java.util.List;

// public class Main {
//     public static void main(String[] args) {
//         List<ReturnJson> res = new ArrayList<>();
//         String[] status = {
//                 "GROUND TEST PASS",
//                 "GROUND TEST INPUT REQUIRED",
//                 "GROUND TEST IN PROGRESS",
//                 "GROUND TEST NOT STARTED",
//                 "GROUND TEST FAIL",
//                 "GROUND TEST PAUSED",
//                 "GROUND TEST INHIBITED",
//                 "GROUND TEST ERROR",
//                 "GROUND TEST ABORTED",
//                 "GROUND TEST COMPLETE"
//         };

//         Connection con = null;
//         Statement stmt = null;
//         ResultSet rs = null;

//         try {
//             // Establish database connection
//             con = DriverManager.getConnection("jdbc:mysql://localhost/OMHMS", "root", "root");

//             // Execute the query
//             stmt = con.createStatement();
//             rs = stmt.executeQuery("SELECT * FROM gt_status_table");

//             // Process the query results
//             while (rs.next()) {
//                 ReturnJson item = new ReturnJson();
//                 item.id = rs.getInt("id");
//                 item.ATA = rs.getInt("ATA");
//                 item.equ_name = rs.getString("equ_name");
//                 item.test_name = rs.getString("test_name");
//                 item.start_time = rs.getString("start_time");
//                 item.status = rs.getInt("status");
//                 item.progress = rs.getInt("progress");
//                 item.status_cfg_index = rs.getInt("status_cfg_index");
//                 item.ata_index = rs.getInt("ata_index");
//                 item.equi_index = rs.getInt("equi_index");
//                 item.instruct = rs.getInt("instruct");
//                 res.add(item);
//             }

//             // Convert list to JSON and print
//             System.out.println(res);

//         } catch (SQLException e) {
//             e.printStackTrace();
//         } finally {
//             // Close the resources
//             try {
//                 if (rs != null) {
//                     rs.close();
//                 }
//                 if (stmt != null) {
//                     stmt.close();
//                 }
//                 if (con != null) {
//                     con.close();
//                 }
//             } catch (SQLException e) {
//                 e.printStackTrace();
//             }
//         }
//     }
// }


public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}