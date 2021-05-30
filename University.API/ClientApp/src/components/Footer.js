import React from 'react'
import styled from 'styled-components/macro'

const FooterContainer = styled.footer`
height:60px;
/* display:flex; */
/* justify-content:space-between; */
/* padding: 1rem 2rem; */
/* z-index: 100; */
/* bottom:0; */
/* position: fixed; */
width:100%;
color:#000000; 
background-color:#1e9080f5; 
`

function Footer() {
    return (
        <FooterContainer>
            "SAP UNIVERSITY"
        </FooterContainer>
    )
}

export default Footer
