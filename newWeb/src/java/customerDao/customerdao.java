/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package customerDao;

/**
 *
 * @author Customer
 */
import customerPozo.Customer;
import java.sql.*;

public class customerdao {

    private Connection con;

    public customerdao(Connection con) {
        this.con = con;
    }
// public boolean saveCustomer(Customer Customer) {
//        boolean f = false;
//        try {
//            //Customer -->database
//
//            String query = "insert into Customer(name,email,password,gender,about) values (?,?,?,?,?)";
//            PreparedStatement pstmt = this.con.prepareStatement(query);
//            pstmt.setString(1, Customer.getName());
//            pstmt.setString(2, Customer.getEmail());
//            pstmt.setString(3, Customer.getPassword());
//            pstmt.setString(4, Customer.getGender());
//            pstmt.setString(5, Customer.getAbout());
//
//            pstmt.executeUpdate();
//            f = true;
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return f;
//
//    }
    //method to insert Customer to data base:
//   

    //get Customer by Customeremail and Customerpassword:
   

//    public boolean updateCustomer(Customer Customer) {
//
//        boolean f = false;
//        try {
//
//            String query = "update Customer set name=? , email=? , password=? , gender=? ,about=? , profile=? where  id =?";
//            PreparedStatement p = con.prepareStatement(query);
//            p.setString(1, Customer.getName());
//            p.setString(2, Customer.getEmail());
//            p.setString(3, Customer.getPassword());
//            p.setString(4, Customer.getGender());
//            p.setString(5, Customer.getAbout());
//            p.setString(6, Customer.getProfile());
//            p.setInt(7, Customer.getId());
//
//            p.executeUpdate();
//            f = true;
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return f;
//    }
    public boolean updatePredict(Customer customer) {

        boolean f = false;
        try {

            String query = "update customer set predicted=? where  id =?";
            PreparedStatement p = con.prepareStatement(query);
            p.setString(1, customer.getPredicted());
            p.setInt(2, customer.getId());
            p.executeUpdate();
            f = true;

        } catch (Exception e) {
           return f;
        }
        return f;
    }
     public boolean updateCustomer(Customer customer) {

        boolean f = false;
        try {

            String query = "update customer set invoice_currency=? ,cust_payment_terms=? where  id =?";
            PreparedStatement p = con.prepareStatement(query);
            p.setString(1, customer.getInvoice_currency());
            p.setString(2, customer.getCust_payment_terms());

            p.setInt(3, customer.getId());
            p.executeUpdate();
            f = true;
        } catch (Exception e) {
           return f;
        }
        return f;
    }
    public boolean DeleteCustomer(Customer customer) {

        boolean f = false;
        try {
            String query = "delete from customer where  id =?";
            PreparedStatement p = con.prepareStatement(query);
            p.setInt(1, customer.getId());
            p.executeUpdate();
            f = true;

        } catch (Exception e) {
           return f;
        }
        return f;
    }

//    public Customer getCustomerByCustomerId(int CustomerId) {
//        Customer Customer = null;
//        try {
//            String q = "select * from Customer where id=?";
//            PreparedStatement ps = this.con.prepareStatement(q);
//            ps.setInt(1, CustomerId);
//            ResultSet set = ps.executeQuery();
//            if (set.next()) {
//                Customer = new Customer();
//
////             data from db
//                String name = set.getString("name");
////             set to Customer object
//                Customer.setName(name);
//
//                Customer.setId(set.getInt("id"));
//                Customer.setEmail(set.getString("email"));
//                Customer.setPassword(set.getString("password"));
//                Customer.setGender(set.getString("gender"));
//                Customer.setAbout(set.getString("about"));
//                Customer.setDateTime(set.getTimestamp("rdate"));
//                Customer.setProfile(set.getString("profile"));
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return Customer;
}