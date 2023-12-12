package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

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
 * Servlet implementation class fetch
 */
@WebServlet("/fetch")
public class fetch extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public fetch() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		Gson gon=new Gson();
		PrintWriter out=response.getWriter();
		JsonParser parser=new JsonParser();
		String res="";
		ArrayList<customer_pojo> arr = new ArrayList<>();
		try {
			arr=customer_crud.selectAllUsers();
			response.setStatus(200);
			res=gon.toJson(arr);
			response.setContentType("application/json");
	        out.print(res);
			
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
