import React from 'react'
import styled from 'styled-components'
import { menuData } from '../data/ManuData'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const DropdownContainer = styled.div`
position:fixed;
z-index:999;
width:100%;
height:100%;
background-color:#1e9080f5;
display:grid;
align-items:center;
top:0;
left:0;
transition: 0.3s ease-in-out;
/* opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
top:${({ isOpen }) => (isOpen ? '0' : '-100%')}; */
`

const Icon = styled.div`
position:absolute;
top:1.2rem;
right:1.5rem;
background:transparent;
font-size:2rem;
cursor: pointer;
outline:none;
`
const CloseIcon = styled(FaTimes)`
color:#000d1a;
`
const DropdownWrapper = styled.div``
const DropdownMenu = styled.div`
display:grid;
grid-template-columns:1fr;
grid-template-rows:repeat(6,80px);
text-align:center;
margin-bottom:4rem;

@media screen and (max-width:480px){
    grid-template-rows:repeat(5,50px);
}
`
const DropdownLink = styled(Link)`
display:flex;
align-items:center;
justify-content:center;
color:#fff;
font-size:1.5rem;
text-decoration:none;
list-style:none;
cursor:pointer;
transition:0.2 ease-in-out;

&:hover{
color:#000d1a;
}
`
const BtnWrap = styled.div`
display:flex;
justify-content:center;
`

function Dropdown({ isOpen, toggle }) {
    return (
        !isOpen
            ? null
            : <DropdownContainer>
                <Icon onClick={toggle} >
                    <CloseIcon />
                </Icon>
                <DropdownWrapper>
                    <DropdownMenu>
                        {menuData.map((item, index) => {
                            return <DropdownLink onClick={toggle} to={item.link} key={index}>
                                {item.title}
                            </DropdownLink>
                        })}
                    </DropdownMenu>
                    <BtnWrap>
                        <Button onClick={toggle} primary="true" round="true" big="true" to="/contacts">
                            Contact Us
                    </Button>
                    </BtnWrap>
                </DropdownWrapper>
            </DropdownContainer>
    )
}

export default Dropdown
