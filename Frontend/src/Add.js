import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

const AddWrapper=styled.div`
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
        padding: 2rem 4rem;
        padding-bottom: 0;
        font-size: 1.4rem;
        color: white;
        background-color: #2d4250;
        width: 100%;
    }
    .Button_container{
        background-color: #2d4250;
        width: 100%;
        display: flex;
        padding: 0rem 0.4rem;
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
    }
    input{
        background-color: white;
        border-radius: 0.5rem;
        height: 3.2rem;
    }
    .MuiTextField-root{
        margin: 2rem 1.2rem;
        width: 100%;
        flex: 1 0 21%;

    }
    .MuiFilledInput-input{
        margin: none;
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

const baseUrl="http://localhost:8080/demo_proj/Add"

const Add= ({visible,setIsVisible, slNo})=>{

    const handleOnChange=(setVal)=>(e)=>{
        setVal(e.target.value)
    }

    const handleOnClickAdd=()=>{
        const body={
            "area_business": "",
            "baseline_create_date": baselineClearDate,
            "buisness_year": buisnessYear,
            "business_code": buisnessCode,
            "clear_date": clearDate,
            "cust_number": customerNumber,
            "cust_payment_terms": customerPaymentTerms,
            "doc_id": documentId,
            "document_create_date": documentCreateDate,
            "document_create_date1": documentCreateDate,
            "document_type": documentType,
            "due_in_date": dueDate,
            "invoice_currency": invoiceCurrency,
            "invoice_id": invoiceId,
            "is_deleted": 0,
            "isopen": 0,
            "posting_date": postingDate,
            "posting_id": postingId,
            "sl_no": slNo,
            "total_open_amount": totalOpenAmount,
        }
        console.log(body)
         axios.post(baseUrl, body)
          .then((response) => {
            alert(getMessage(response.data))
            setIsVisible(false)
          }, (error) => {
            console.log(error);
          }); 
    }

    const [buisnessCode,setBuisnessCode]= useState("")
    const [customerNumber,setCustomerNumber]= useState("")
    const [clearDate,setClearDate]= useState("")
    const [buisnessYear,setBuisnessYear]= useState("")
    const [documentId,setDocumentId]= useState("")
    const [postingDate,setPostingDate]= useState("")
    const [documentCreateDate,setDocumentCreateDate]= useState("")
    const [dueDate,setDueDate]= useState("")
    const [invoiceCurrency,setInvoiceCurrency]= useState("")
    const [documentType,setDocumentType]= useState("")
    const [postingId,setPostingId]= useState("")
    const [totalOpenAmount,setTotalOpenAmount]= useState("")
    const [baselineClearDate,setBaselineClearDate]= useState("")
    const [customerPaymentTerms,setCustomerPaymentTerms]= useState("")
    const [invoiceId,setInvoiceId]= useState("")


    return(
        visible?<AddWrapper>
            <p>
                Add
            </p>
        <form>
        <TextField label="Business Code"  onChange={handleOnChange(setBuisnessCode)} variant="filled" />
            <TextField label="Customer Number" onChange={handleOnChange(setCustomerNumber)} variant="filled" />
            <TextField label="Clear Date" type="date" onChange={handleOnChange(setClearDate)} variant="filled" />
            <TextField label="Buisness Year" onChange={handleOnChange(setBuisnessYear)} variant="filled"/>
            <TextField label="Document Id" onChange={handleOnChange(setDocumentId)} variant="filled"/>
            <TextField label="Posting Date" type="date" onChange={handleOnChange(setPostingDate)} variant="filled"/>
            <TextField label="Document Create Date" type="date" onChange={handleOnChange(setDocumentCreateDate)} variant="filled"/>
            <TextField label="Due Date" type="date" onChange={handleOnChange(setDueDate)} variant="filled"/>
            <TextField label="Invoice Currency" onChange={handleOnChange(setInvoiceCurrency)} variant="filled" />
            <TextField label="Document Type" onChange={handleOnChange(setDocumentType)} variant="filled" />
            <TextField label="Posting Id" onChange={handleOnChange(setPostingId)} variant="filled" />
            <TextField label="Total open amount" onChange={handleOnChange(setTotalOpenAmount)} variant="filled" />
            <TextField label="Baseline Clear Date" type="date" onChange={handleOnChange(setBaselineClearDate)} variant="filled" />
            <TextField label="Customer Payment Terms" onChange={handleOnChange(setCustomerPaymentTerms)} variant="filled" />
            <TextField label="Invoice Id" onChange={handleOnChange(setInvoiceId)} variant="filled" />
            <TextField style={{"zIndex":-1}} />


        {/*
            <input placeholder="Buisness Code" onChange={handleOnChange(setBuisnessCode)} />
            <input placeholder="Customer Number" onChange={handleOnChange(setCustomerNumber)} />
            <input placeholder="Clear Date" type="date" onChange={handleOnChange(setClearDate)} />
            <input placeholder="Buisness Year" onChange={handleOnChange(setBuisnessYear)} />
            <input placeholder="Document Id" onChange={handleOnChange(setDocumentId)} />
            <input placeholder="Posting Date" type="date" onChange={handleOnChange(setPostingDate)} />
            <input placeholder="Document Create Date" type="date" onChange={handleOnChange(setDocumentCreateDate)} />

            <input placeholder="Due Date" type="date" onChange={handleOnChange(setDueDate)} />
            <input placeholder="Invoice Currency" onChange={handleOnChange(setInvoiceCurrency)} />
            <input placeholder="Document Type" onChange={handleOnChange(setDocumentType)} />
            <input placeholder="Posting Id" onChange={handleOnChange(setPostingId)} />
            <input placeholder="Total open amount" onChange={handleOnChange(setTotalOpenAmount)} />
            <input placeholder="Baseline Clear Date" type="date" onChange={handleOnChange(setBaselineClearDate)} />
            <input placeholder="Customer Payment Terms" onChange={handleOnChange(setCustomerPaymentTerms)} />
            <input placeholder="Invoice Id" onChange={handleOnChange(setInvoiceId)} />  
            <input style={{"zIndex":-1}} />
    */}
        </form>
        <div className="Button_container">
                <button onClick={handleOnClickAdd}>ADD</button>
                <button onClick={()=>setIsVisible(!visible)}>CANCEL</button>
            </div>
    </AddWrapper>:<></>
    )

}

export default Add;