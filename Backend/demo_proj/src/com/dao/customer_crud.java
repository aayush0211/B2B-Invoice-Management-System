package com.dao;
import java.sql.*;
import java.util.*;

import com.pojo.customer_pojo;

public class customer_crud {
	
	
	//database details
	private static String url ="jdbc:mysql://localhost:3306/grey_goose";
	private	static String user = "root";
	private static String pass ="1234";
	
	//sql queries
 




	
	//jdbc connection
	protected static Connection getConnection() throws Exception
	{
		 Connection conn =null;		
				try 
				{
					Class.forName("com.mysql.cj.jdbc.Driver");
					conn =DriverManager.getConnection(url,user,pass);
				} 
				catch (Exception e) 
				{	
					e.printStackTrace();
				} 
				return conn;

	}
	
	
	//insert user
	public int insertUser(customer_pojo cust) throws SQLException
	{
		String Insert="INSERT INTO winter_internship"+ " (sl_no, business_code, cust_number,"
				+ "clear_date, buisness_year, doc_id, posting_date, document_create_date, document_create_date1,"
				+ "due_in_date, invoice_currency, document_type, posting_id, area_business, total_open_amount,"
				+ "baseline_create_date, cust_payment_terms, invoice_id, isOpen, is_deleted) values "+"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
		int n = 0;
		
		try
		{
			Connection con=getConnection();
			PreparedStatement preparedStatement=con.prepareStatement(Insert);
			
			preparedStatement.setInt(1,cust.getSl_no());
			preparedStatement.setString(2, cust.getBusiness_code());
			preparedStatement.setInt(3, cust.getCust_number());
			preparedStatement.setString(4, cust.getClear_date());
			preparedStatement.setInt(5, cust.getBuisness_year());
			preparedStatement.setString(6, cust.getDoc_id());
			preparedStatement.setString(7, cust.getPosting_date());
			preparedStatement.setString(8, cust.getDocument_create_date());
			preparedStatement.setString(9, cust.getDocument_create_date1());
			preparedStatement.setString(10, cust.getDue_in_date());
			preparedStatement.setString(11, cust.getInvoice_currency());
			preparedStatement.setString(12, cust.getDocument_type());
			preparedStatement.setInt(13, cust.getPosting_id());
			preparedStatement.setString(14, cust.getArea_business());
			preparedStatement.setDouble(15, cust.getTotal_open_amount());
			preparedStatement.setString(16, cust.getBaseline_create_date());
			preparedStatement.setString(17, cust.getCust_payment_terms());
			preparedStatement.setInt(18, cust.getInvoice_id());
			preparedStatement.setInt(19, cust.getIsopen());
			preparedStatement.setInt(20, cust.getIs_deleted());
			
			n=preparedStatement.executeUpdate();
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return n;
	}
	
	
	
	//to select all the users
	public static ArrayList<customer_pojo> selectAllUsers() throws Exception 
	{
		String read="select * from winter_internship;";
		ArrayList<customer_pojo> a = new ArrayList<>();
		try
		{
			Connection con=getConnection();
			PreparedStatement preparedStatement=con.prepareStatement(read);
			ResultSet rs=preparedStatement.executeQuery();
	

			while (rs.next()) 
			{
				
				customer_pojo p = new customer_pojo();
				
				p.setSl_no(rs.getInt("sl_no"));
				p.setBusiness_code(rs.getString("business_code"));
				p.setCust_number(rs.getInt("cust_number"));
				p.setClear_date(rs.getString("clear_date"));
				p.setBuisness_year(rs.getInt("buisness_year"));
				p.setDoc_id(rs.getString("doc_id"));
				p.setPosting_date(rs.getString("posting_date"));
				p.setDocument_create_date(rs.getString("document_create_date"));
				p.setDocument_create_date1(rs.getString("document_create_date1"));
				p.setDue_in_date(rs.getString("due_in_date"));
				p.setInvoice_currency(rs.getString("invoice_currency"));
				p.setDocument_type(rs.getString("document_type"));
				p.setPosting_id(rs.getInt("posting_id"));
				p.setArea_business(rs.getString("area_business"));
				p.setTotal_open_amount(rs.getDouble("total_open_amount"));
				p.setBaseline_create_date(rs.getString("baseline_create_date"));
				p.setCust_payment_terms(rs.getString("cust_payment_terms"));
				p.setInvoice_id(rs.getInt("invoice_id"));
				p.setIsopen(rs.getInt("isOpen"));
				p.setIs_deleted(rs.getInt("is_deleted"));
		
				a.add(p);	
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	return a;
	
	}
	
	
	
	//delete a user
	public static int deleteRecord(ArrayList<Integer> sl_no) throws Exception 
	{
		String delete="delete from winter_internship where sl_no in (";
		int rowDel=0;
		String s = "";
		for(int i:sl_no)
		{

			s = s + i + ", ";
		}
		String st = s.substring(0, s.length() - 2);
		delete = delete + st + ");";

		
		try
		{
			Connection connection = getConnection();
			PreparedStatement statement = connection.prepareStatement(delete);
			System.out.println(delete.toString());
			rowDel = statement.executeUpdate();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return rowDel;
	}
	
	
	
	//advance search
	public static customer_pojo advance_search(String doc_id1,int cust_number1,int invoice_id1,int buisness_year1) throws Exception 
	{
		String AdSearch="SELECT * from winter_internship where doc_id= ? and cust_number= ? and invoice_id=? and buisness_year=?;";
		ResultSet rs;
		customer_pojo p = new customer_pojo();
		try 
		{
			Connection connection = getConnection();
			PreparedStatement pstatement = connection.prepareStatement(AdSearch);
			
			pstatement.setString(1, doc_id1);
			pstatement.setInt(2, cust_number1);
			pstatement.setInt(3, invoice_id1);
			pstatement.setInt(4, buisness_year1);
			
			rs=pstatement.executeQuery();
			rs.next();
			
			p.setSl_no(rs.getInt("sl_no"));
			p.setBusiness_code(rs.getString("business_code"));
			p.setCust_number(rs.getInt("cust_number"));
			p.setClear_date(rs.getString("clear_date"));
			p.setBuisness_year(rs.getInt("buisness_year"));
			p.setDoc_id(rs.getString("doc_id"));
			p.setPosting_date(rs.getString("posting_date"));
			p.setDocument_create_date(rs.getString("document_create_date"));
			p.setDocument_create_date1(rs.getString("document_create_date1"));
			p.setDue_in_date(rs.getString("due_in_date"));
			p.setInvoice_currency(rs.getString("invoice_currency"));
			p.setDocument_type(rs.getString("document_type"));
			p.setPosting_id(rs.getInt("posting_id"));
			p.setArea_business(rs.getString("area_business"));
			p.setTotal_open_amount(rs.getDouble("total_open_amount"));
			p.setBaseline_create_date(rs.getString("baseline_create_date"));
			p.setCust_payment_terms(rs.getString("cust_payment_terms"));
			p.setInvoice_id(rs.getInt("invoice_id"));
			p.setIsopen(rs.getInt("isOpen"));
			p.setAging_bucket(rs.getString("aging_bucket"));
			p.setIs_deleted(rs.getInt("is_deleted"));
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return p;
	}
		
		
		//update query
		public int update_values(String invoice_currency1,String payment_terms1,int sl_no1) throws Exception 
		{
			
			StringBuilder str=new StringBuilder();
			int row=0;
			String update="update winter_internship set ";
			
			if(!invoice_currency1.isEmpty())
				str.append("invoice_currency=\""+invoice_currency1+"\",");
			if(!payment_terms1.isEmpty())
				str.append("cust_payment_terms =\""+payment_terms1+"\",");
			
			String s=str.substring(0,str.length()-1);
			
			s=s+" where sl_no = "+ sl_no1+" ;";

			
			update=update+s;
			
			try 
			{
				Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(update);
				System.out.println(update);
				row=statement.executeUpdate();
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			return row;
	}


}
