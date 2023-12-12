package com.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.customer_crud;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pojo.customer_pojo;

/**
 * Servlet implementation class ad_search
 */
@WebServlet("/ad_search")
public class ad_search extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ad_search() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//esponse.getWriter().append("Served at: ").append(request.getContextPath());
		response.setContentType("application/json");
		StringBuilder str=new StringBuilder();
		PrintWriter out=response.getWriter();
		Gson gon=new Gson();
		
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
		System.out.println(body.toString());
		JsonObject jB=(JsonObject) parser.parse(body);

		
		String doc_id1=jB.get("doc_id").getAsString();
		int cust_number1=jB.get("cust_number").getAsInt();
		int invoice_id1=jB.get("invoice_id").getAsInt();
		int buisness_year1=jB.get("buisness_year").getAsInt();

		try {
			customer_pojo p=customer_crud.advance_search(doc_id1, cust_number1, invoice_id1, buisness_year1);
			response.setStatus(200);
			String val="";
			if(p.getSl_no()==0)
				val="Row not present";
			else
				val=gon.toJson(p);
			response.setContentType("application/json");
			out.print(val);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			response.setStatus(400);
			res = "{Error: \" Some Kind of error: "+e.getLocalizedMessage()+"\"}";
			JsonObject result=(JsonObject)parser.parse(res);
	        out.print(result);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
