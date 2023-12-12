import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from 'react';

const DeleteWrapper=styled.div`
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
        width: 50%;
        
    }
    .del
    {
        padding-bottom: 2rem;
    }
    .Button_container{
        background-color: #2d4250;
        width: 50%;
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
`
const baseUrl="http://localhost:8080/demo_proj/delete"
const Delete=({isDeleteVisible, setIsDeleteVisible, ids})=>{
    const body={

        "sl_no": ids
    }

    const handleDelete=()=>{
        axios.post(baseUrl, body)
        .then((response) => {
            setIsDeleteVisible(false)
          console.log(response);
        }, (error) => {
          console.log(error);
        }); 

    }


    return(
        isDeleteVisible?<DeleteWrapper>
            <p>
                Delete Record ?
            </p>
            <p className="del">
                Are you sure you want to delete the record[s] ?
            </p>
        
        <div className="Button_container">
                <button onClick={handleDelete}>DELETE</button>
                <button onClick={()=>setIsDeleteVisible(!isDeleteVisible)}>CANCEL</button>
            </div>
    </DeleteWrapper>:<></>
    )
}

export default Delete;