import React from "react";
import styled from "styled-components";
import logo from "./logo.png";
import abc_logo from "./abc_logo.svg";
const HeaderWrapper =styled.header`
    background-color: #2d4250;
    padding: 1rem;
    display: flex;
    justify-content: center;
    .abc{
        position: absolute;
        left: 1rem;
    }
    img{
        height: 3rem;    
    }
`


const Header=()=> {
  return(
    <HeaderWrapper>
        <a> <img className="abc" src={abc_logo}/></a>
        <a> <img className="hrc" src={logo}/></a>
    </HeaderWrapper>
  );
}

export default Header;
