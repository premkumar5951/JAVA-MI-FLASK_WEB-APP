/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package MainServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.sql.ResultSet;
import java.sql.Statement;
import org.json.*;
import customerPozo.Customer;
import customerDao.customerdao;

public class Check extends HttpServlet {

    protected JSONArray processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try ( PrintWriter out = response.getWriter()) {
            boolean isGET = "GET".equals(request.getMethod());
            boolean isPOST = "POST".equals(request.getMethod());
            boolean isPUT = "PUT".equals(request.getMethod());
            boolean isDELETE = "DELETE".equals(request.getMethod());

            JSONArray jsonArray = new JSONArray();
            if (isGET) {
                /* TODO output your page here. You may use following sample code. */
                try {
                    Connection con = connectionProvider.getConnection();
                    Statement stmt = con.createStatement();
                    ResultSet rs = stmt.executeQuery("select * from customer");
                    while (rs.next()) {
                        int total_columns = rs.getMetaData().getColumnCount();
                        JSONObject obj = new JSONObject();
                        for (int i = 0; i < total_columns; i++) {
                            obj.put(rs.getMetaData().getColumnLabel(i + 1), rs.getObject(i + 1));
                        }
                        jsonArray.put(obj);
                    }
                    out.println(jsonArray);
                    return jsonArray;
                } catch (Exception e) {
                    out.println("connection not successfull");
                }
            } else if (isPOST) {
                String data;
                StringBuilder jb = new StringBuilder();
                String line;
                try {
                    BufferedReader reader = request.getReader();
                    while ((line = reader.readLine()) != null) {
                        jb.append(line);
                    }
                    data = jb.toString();
                    JSONArray jsondata = new JSONArray(data);
                    JSONObject objData = jsondata.getJSONObject(0);
                    out.print(objData.getString("posting_date"));

//                        return null;
                } catch (Exception e) {
                    out.print(e);

                }

            } else if (isPUT) {
                String data;
                StringBuilder jb = new StringBuilder();
                String line;
                try {
                    BufferedReader reader = request.getReader();
                    while ((line = reader.readLine()) != null) {
                        jb.append(line);
                    }
                    data = jb.toString();
                    JSONObject jsondata = new JSONObject(data);
                    JSONArray arrydata = jsondata.getJSONArray("data");
                    for (int i = 0; i < arrydata.length(); i++) {
                        JSONObject objData = arrydata.getJSONObject(i);
                        int id = objData.getInt("id");
                        if (objData.has("predicted")) {
                            String predicted = objData.getString("predicted");
                            Customer customer = new Customer(id, predicted);
                            customerdao dao = new customerdao(connectionProvider.getConnection());
                            if (dao.updatePredict(customer)) {
                                out.print("done");
                            } else {
                                out.print("error");
                            }
                        } else {
                            String invoice = objData.getString("invoice_currency");
                            String payment = objData.getString("cust_payment_terms");
//                            out.print(invoice);
                            Customer customer = new Customer(id,invoice,payment );
                            customerdao dao = new customerdao(connectionProvider.getConnection());
                            if (dao.updateCustomer(customer)) {
                                out.print("done");
                            } else {
                                out.print("error");
                            }
                        }

                    }

//                  return null;
                } catch (Exception e) {
                    out.print(e);

                }

            } else if (isDELETE) {
                String data;
                StringBuilder jb = new StringBuilder();
                String line;
                try {
                    BufferedReader reader = request.getReader();
                    while ((line = reader.readLine()) != null) {
                        jb.append(line);
                    }
                    data = jb.toString();
//                    JSONObject jsondata = new JSONObject(data);
                    JSONArray arrydata = new JSONArray(data);
                    for (int i = 0; i < arrydata.length(); i++) {
                        JSONObject objData = arrydata.getJSONObject(i);
                        int id = objData.getInt("id");
                        Customer customer = new Customer();
                        customer.setId(id);
                        customerdao dao = new customerdao(connectionProvider.getConnection());
                        if (dao.DeleteCustomer(customer)) {
                            out.print("done");
                        } else {
                            out.print("error");
                        }
//                  return null;
                    }
                } catch (Exception e) {
                }
            }
        } catch (Exception e) {
            // crash and burn
            throw new IOException("Error parsing JSON request string");
        }
        return null;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
