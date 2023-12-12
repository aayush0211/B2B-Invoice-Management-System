package com.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.customer_crud;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class delete
 */
@WebServlet("/delete")
public class delete extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public delete() {
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
		//doGet(request, response);
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
		JsonArray arr=(JsonArray)jB.get("sl_no").getAsJsonArray();
		ArrayList<Integer> sl=new ArrayList<Integer>();
				
		for(int i=0;i<arr.size();i++)
		{
			sl.add(arr.get(i).getAsInt());
		}
		System.out.println(sl.toString());	
		
		try {
			int rowDeleted=customer_crud.deleteRecord(sl);
			response.setStatus(200);
			if(rowDeleted!=0)
				res="{Success: \" Succsessfully deleted all the \""+rowDeleted+"\" rows\"}";
			else
				res="{Error: \" Some Kind of error\"}";
			JsonObject result=(JsonObject)parser.parse(res);
	        out.print(result);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			response.setStatus(400);
			res="{Error: \" Some Kind of error: "+e.getLocalizedMessage()+"\"}";
			JsonObject result=(JsonObject)parser.parse(res);
	        out.print(result);
		
		}
	}

}
