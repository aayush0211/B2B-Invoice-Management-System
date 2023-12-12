import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';


const AdvanceWrapper=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: rgb(0,0,0,0.75);
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    padding: 4rem;
    z-index: 2;
    p{
        padding: 2rem 2rem;
        padding-bottom: 1;
        font-size: 1.8rem;
        color: white;
        background-color: #2d4250;
        width: 40rem;
    }
    .Button_container{
        background-color: #2d4250;
        width: 40rem;
        display: flex;
        padding:  0 1rem 0.4rem 0.4rem;
        button{ 
            color: white;
            background-color: #2d4250;
            margin: 0rem 0.2rem;
            font-size: 1.2rem;
            width: 100%;
            padding: 1rem  2rem;
            border-radius: 0.5rem;
            border:white solid 2px ;
        }  
    }
    form{
        display: flex;
        background-color: #2d4250;
        padding: 2rem;
        padding-top:0;
        flex-wrap: wrap;
        width: 40rem;
        input{
           font-size: 1rem;
            background-color: white;
            border-radius: 0.5rem;
            height: 2rem;
        }
    }
    .MuiTextField-root{
        flex: 1 0 30%;
        background-color: white;
        border-radius: 0.5rem;
        margin: 0.4rem 0.7rem;
        width: 100%;
    }
    .MuiInputLabel-root{
        align-content: center;
        font-size: 1.2rem;
    }
    
`

const baseUrl="http://localhost:8080/demo_proj/ad_search"

const Advance=({isAdvanceVisible,setIsAdvanceVisible, setData})=>{
    const handleOnChange=(setVal)=>(e)=>{
        setVal(e.target.value)
    }

    const [documentId,setDocumentId]= useState("")
    const [invoiceId,setInvoiceId]= useState("")
    const [customerNumber,setCustomerNumber]= useState("")
    const [buisnessYear,setBuisnessYear]= useState("")


    const handleOnAdvanceClick=()=>{
        const body={
            "doc_id": documentId,
            "invoice_id": invoiceId,
            "cust_number": customerNumber,
            "buisness_year": buisnessYear
        }
        console.log(body)
         axios.post(baseUrl, JSON.stringify(body))
          .then((response) => {
            const found=response.data
            if(typeof(found)=="string")
            {
                alert("Not Found")
            }
            else
            {
                found.id=found.sl_no
                setData([found])
            }
            setIsAdvanceVisible(false)
          }, (error) => {
            console.log(error);
          }); 
    }
    

    return(
        isAdvanceVisible?<AdvanceWrapper>
            <p>
                Advance Search
            </p>
        <form>
            <TextField label="Document Id"   onChange={handleOnChange(setDocumentId)} variant="filled" />
            <TextField label="Invoice Id"  onChange={handleOnChange(setInvoiceId)} variant="filled" />
            <TextField label="Customer Number"  onChange={handleOnChange(setCustomerNumber)} variant="filled" />
            <TextField label="Buisness Year" onChange={handleOnChange(setBuisnessYear)} variant="filled" />
        </form>
        <div className="Button_container">
                <button onClick={handleOnAdvanceClick}>SEARCH</button>
                <button onClick={()=>setIsAdvanceVisible(!isAdvanceVisible)}>CANCEL</button>
            </div>
    </AdvanceWrapper>:<></>
    )
}

export default Advance;