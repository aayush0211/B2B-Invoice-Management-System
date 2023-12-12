import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';


const EditWrapper=styled.div`
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
        padding-bottom: 1rem;
        font-size: 1.8rem;
        color: white;
        background-color: #2d4250;
        width: 40rem;
    }
    .Button_container{
        background-color: #2d4250;
        width: 40rem;
        display: flex;
        padding: 0 1rem 0.4rem 0.4rem;
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
        flex: 1 0 21%;
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

const getMessage = (data) => {
    if(data.Success == undefined) return data.Error
    else return data.Success
}

const baseUrl="http://localhost:8080/demo_proj/update"

const Edit=({isEditVisible,setIsEditVisible,selectedRow})=>{
    const handleOnChange=(setVal)=>(e)=>{
        setVal(e.target.value)
    }

    const [invoiceCurrency,setInvoiceCurrency]= useState("")
    const [customerPaymentTerms,setCustomerPaymentTerms]= useState("")


    const handleOnEditClick=()=>{
        const body={
            "sl_no": selectedRow.sl_no,
            "cust_payment_terms": customerPaymentTerms,
            "invoice_currency": invoiceCurrency,
        }
        console.log(body)
         axios.post(baseUrl, body)
          .then((response) => {
              setIsEditVisible(false)
            alert(getMessage(response.data));
            console.log(response.data.Error)
          }, (error) => {
            console.log(error);
          }); 
    }
    

    return(
        isEditVisible?<EditWrapper>
            <p>
                Edit
            </p>
        <form>
        <TextField label="Invoice Currency" placeholder={selectedRow.invoice_currency}  onChange={handleOnChange(setInvoiceCurrency)} variant="filled" />
            <TextField label="Customer Payment Terms" placeholder={selectedRow.cust_payment_terms} onChange={handleOnChange(setCustomerPaymentTerms)} variant="filled" />
        </form>
        <div className="Button_container">
                <button onClick={handleOnEditClick}>EDIT</button>
                <button onClick={()=>setIsEditVisible(!isEditVisible)}>CANCEL</button>
            </div>
    </EditWrapper>:<></>
    )
}

export default Edit;