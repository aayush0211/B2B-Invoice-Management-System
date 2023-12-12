import React from "react";
import styled from "styled-components";
const FooterWrapper =styled.footer`
    background-color: #2d4250;
    padding: 1rem;
    display: flex;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    a
    {
        color: lightblue;
        text-decoration: underline;
    }
`


const Footer=()=> {
  return(
    <FooterWrapper>
        <a>Privacy Policy </a>
        <span> | © 2022 Highradius.All Rights Reserved.</span>
    </FooterWrapper>
  );
}

export default Footer;
