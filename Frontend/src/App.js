import React from "react";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Dash from "./dash";


function App() {
  const [isVisible,setIsVisible]= useState(false)
  const [selectedRow,setSelectedRow]=useState("")
  const [isEditVisible,setIsEditVisible]= useState(false)
  const [searched,setSearched]=useState("")

  return (
    <>
    <Header />
    <Dash />
    <Footer />  
    </>
  );
}

export default App;
