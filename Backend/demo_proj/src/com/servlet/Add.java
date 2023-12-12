package com.servlet;

import java.io.*;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.customer_crud;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pojo.*;

/**
 * Servlet implementation class Add
 */
@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public Add() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
		StringBuilder str=new StringBuilder();
		PrintWriter out=response.getWriter();
		String res="";

		InputStream inpStream=request.getInputStream();
		BufferedReader br =new BufferedReader(new InputStreamReader(inpStream));
		char[] ch=new char[128];
		int bytesRead=-1;
		while((bytesRead= br.read(ch))>1)
		{
			str.append(ch,0,bytesRead);
		}	
		
		String body=str.toString();
		JsonParser parser=new JsonParser();
		JsonObject jB=(JsonObject)parser.parse(body);
		
		customer_pojo a=new customer_pojo();
		
		a.setSl_no(jB.get("sl_no").getAsInt());
		a.setBusiness_code(jB.get("business_code").getAsString());
		a.setCust_number(jB.get("cust_number").getAsInt());
		a.setClear_date(jB.get("clear_date").getAsString());
		a.setBuisness_year(jB.get("buisness_year").getAsInt());
		a.setDoc_id(jB.get("doc_id").getAsString());
		a.setPosting_date(jB.get("posting_date").getAsString());
		a.setDocument_create_date(jB.get("document_create_date").getAsString());
		a.setDocument_create_date1(jB.get("document_create_date1").getAsString());
		a.setDue_in_date(jB.get("due_in_date").getAsString());
		a.setInvoice_currency(jB.get("invoice_currency").getAsString());
		a.setDocument_type(jB.get("document_type").getAsString());
		a.setPosting_id(jB.get("posting_id").getAsInt());
		a.setArea_business(jB.get("area_business").getAsString());
		a.setTotal_open_amount(jB.get("total_open_amount").getAsDouble());
		a.setBaseline_create_date(jB.get("baseline_create_date").getAsString());
		a.setCust_payment_terms(jB.get("cust_payment_terms").getAsString());
		a.setInvoice_id(jB.get("invoice_id").getAsInt());
		a.setIsopen(jB.get("isopen").getAsInt());
		a.setIs_deleted(jB.get("is_deleted").getAsInt());
		
		customer_crud insert=new customer_crud();
		
		try {
			int n=insert.insertUser(a);
			response.setStatus(200);
			if(n!=0)
				res="{Success: \" Succsessfully added the row\"}";
			else
				res="{Error: \" Some Kind of error\"}";
			JsonObject result=(JsonObject)parser.parse(res);
	        out.print(result);
	  
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			response.setStatus(400);
			res="{Error: \" Some Kind of error: "+e.getLocalizedMessage()+"\"}";
			JsonObject result=(JsonObject)parser.parse(res);
	        out.print(result);
		}
		

	}

}
