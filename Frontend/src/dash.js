import React from "react";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import Add from './Add';
import Edit from "./edit";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Advance from "./advance";
import Delete from "./delete";
import { TextField } from "@mui/material";

const DashWrapper=styled.div`

`
const DashboardWrapper =styled.div`
    background-color: #2d4250;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    button{
        width: 12rem;
        height: 3rem;
        border: none;
        padding: 0.4rem 1rem;
        background: transparent;
        color: white;
        font-size: 0.8rem;
        width: 10rem;
        text-transform: uppercase;
        :hover{
            background-color: steelblue;
        }
    }
    .left{
        .predict{
            border-left: steelblue solid 4px;
            border-top: steelblue solid 4px;
            border-bottom: steelblue solid 4px;
            border-top-left-radius: .5rem;
            border-bottom-left-radius: .5rem;
        }
        .analytics{
            border-top: steelblue solid 4px;
            border-bottom: steelblue solid 4px;
        }
        .advance{
            border-top: steelblue solid 4px;
            border-bottom: steelblue solid 4px;
            border-right: steelblue solid 4px;
            border-top-right-radius: .5rem;
            border-bottom-right-radius: .5rem;
        }
        .refresh{
            border: steelblue solid 4px;
            border-radius: .5rem;
            width: 5rem;
            margin-left: 1rem;
        }
        display: flex;
        align-items: center;  
    }
    .right{
        display: flex;
        .add, .delete{
            border: steelblue solid 4px;
            border-radius: .5rem;
        }
    }
    input{
        background-color: white;
        border-radius: 0.4rem;
        height: 1.3rem;
    }
`

const DataGridWrapper = styled.div`
  font-size: 1rem;
  .MuiDataGrid-root, .MuiToolbar-root ,span {
    color: white;
  }
  .MuiDataGrid-columnHeaderTitle,.doc{
    font-size: 1.1rem;
    overflow: hidden;
    width: 15rem;
    word-break: keep-all;

  }
  .MuiDataGrid-iconSeparator{
    display: none;
  }

  background-color: #283d4a;
  height: 80vh;
`

const columns = [
  { field: 'sl_no', headerName: 'Sl no',type: 'number', width: 70 },
  { field: 'business_code', headerName: 'Business Code', width: 150 },
  { field: 'cust_number', headerName: 'Customer Id', width: 150 },
  { field: 'clear_date', headerName: 'Clear Date', width: 150 },
  { field: 'buisness_year',headerName: 'Buisness Year', width: 150,},
  { field: 'doc_id', headerName: 'Document Id', width: 150 },
  { field: 'posting_date', headerName: 'Posting Date', width: 150 },
  { field: 'document_create_date', headerName: 'Document Create Date',width:250 },
  { field: 'due_in_date', headerName: 'Due In Date', width: 150 },
  { field: 'invoice_currency', headerName: 'Invoice Currency', width: 150 },
  { field: 'document_type', headerName: 'Document Type', width: 150 },
  { field: 'posting_id', headerName: 'Posting Id', type: 'number', width: 100 },
  { field: 'total_open_amount', headerName: 'Total Open Amount', type: 'number',width: 200 },
  { field: 'baseline_create_date', headerName: 'Baseline Create Date', width: 220 },
  { field: 'cust_payment_terms', headerName: 'Customer Payment Terms', width: 250 },
  { field: 'invoice_id', headerName: 'Invoice Id',type: 'number', width: 150 },
];


const baseUrl="http://localhost:8080/demo_proj/fetch"



const Dash=()=>{
    const [isVisible,setIsVisible]= useState(false)
    const [selectedRow,setSelectedRow]=useState("") 
    const [isEditVisible,setIsEditVisible]= useState(false)
    const [isDeleteVisible,setIsDeleteVisible]= useState(false)
    const [isAdvanceVisible,setIsAdvanceVisible]=useState(false)
    const [checkedRows,setCheckedRows]=useState([])
    const [searched,setSearched]=useState("")

    const [data,setData]=useState([])
    const [initialData, setInitialData] = useState([])

    const [newSlNo, setNewSlNo] = useState(0)
 

    const handleAddclick=()=>{
        setIsVisible(true)
    }

    const handleOnRowClick=(e)=>{
        setSelectedRow(e.row)
    }

      const handleOnChange=(e)=>{
        setSearched(e.target.value)
        setData(initialData)
        if(searched == ""){
            setData(initialData)
        }
        }

      const handleSearch = () => {
          if(searched === ""){
              setData(initialData)
          }
          else{
          console.log("Searched Text : ", searched)
          const filteredData = initialData.filter((row)=>{
              return (String(row.cust_number).startsWith(searched))
          })
          console.log(filteredData)
          setData(filteredData)
        }
      };

      const handleKeyPress = e => {
        if (e.charCode === 13) {
            console.log("Searched Text : ", searched)
            handleSearch()
        }
      };
    
      let arr=[]
    
      const refreshData=()=>{
        axios.get(baseUrl).then((response) => {
            arr=response.data.map((row)=>{
              row.id=row.sl_no
              return row
            })
            setData(arr);
            setInitialData(arr)
            setNewSlNo(arr[arr.length -1].sl_no + 1)
          });

      }

      useEffect(() => {
           refreshData() 
        }, [])


    return(
        <DashWrapper>
            <DashboardWrapper>
                <div className="left">
                    <button className="predict">Predict</button>
                    <button className="analytics">Analytics View</button>
                    <button className="advance" onClick={()=>setIsAdvanceVisible(true)}>Advance Search</button>
                    <button className="refresh" onClick={refreshData}>↻</button>
                </div>
                <TextField label="Search Customer_Id" variant="filled" onChange={handleOnChange} onKeyPress = {handleKeyPress} /> 
                <div className="right">
                    <button className="add" onClick={handleAddclick}>Add</button>
                    <button className="edit" onClick={()=>setIsEditVisible(true)}>Edit</button>
                    <button className="delete" onClick={()=>setIsDeleteVisible(true)}>Delete</button>
                </div>
            </DashboardWrapper>
            <Advance isAdvanceVisible={isAdvanceVisible} setIsAdvanceVisible={setIsAdvanceVisible} setData={setData} />
            <Add visible={isVisible} setIsVisible={setIsVisible} slNo = {newSlNo} />
            <Edit isEditVisible={isEditVisible} setIsEditVisible={setIsEditVisible} selectedRow={selectedRow} />
            <Delete isDeleteVisible={isDeleteVisible} setIsDeleteVisible={setIsDeleteVisible} ids={checkedRows} />
            <DataGridWrapper>
                <DataGrid
                    rows={data}
                    columns={columns}
                    rowsPerPageOptions={[5,10,25,50,75,100]}
                    checkboxSelection
                    onRowClick={handleOnRowClick}
                    onSelectionModelChange={(ids) => {
                        setCheckedRows(ids)
                      }}
                />
            </DataGridWrapper>
        </DashWrapper>
    ) 

}

export default Dash;