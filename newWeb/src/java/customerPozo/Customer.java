/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package customerPozo;
import java.sql.*;

public class Customer {

    private int id;
    private String invoice_currency;
    private String cust_payment_terms;
    private String predicted;



    public Customer(int id, String invoice_currency, String cust_payment_terms, String predicted) {
        this.id = id;
        this.invoice_currency = invoice_currency;
        this.cust_payment_terms = cust_payment_terms;
        this.predicted = predicted;
    }
 public Customer(int id, String invoice_currency, String cust_payment_terms) {
        this.id = id;
        this.invoice_currency = invoice_currency;
        this.cust_payment_terms = cust_payment_terms;
    }
    public Customer() {
    }
    public Customer(int id,String predicted) {
        this.id = id;
        this.predicted = predicted;
    }
    public Customer(String cust_payment_terms, String invoice_currency, String predicted) {
        this.invoice_currency = invoice_currency;
        this.cust_payment_terms = cust_payment_terms;
        this.predicted=predicted;
    }
    
//    getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    public String getPredicted() {
        return predicted;
    }

    public void setPredicted(String predicted) {
        this.predicted = predicted;
    }
    public String getInvoice_currency() {
        return invoice_currency;
    }

    public void setInvoice_currency(String invoice_currency) {
        this.invoice_currency = invoice_currency;
    }

    public String getCust_payment_terms() {
        return cust_payment_terms;
    }

    public void setCust_payment_terms(String cust_payment_terms) {
        this.cust_payment_terms = cust_payment_terms;
    }

}