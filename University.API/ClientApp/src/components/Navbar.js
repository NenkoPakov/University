import React, { useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { menuData } from '../data/ManuData'
import { Button } from './Button'
import { TiThMenuOutline } from 'react-icons/ti'


const Nav = styled.nav`
height:60px;
display:flex;
justify-content:space-between;
padding: 1rem 2rem;
z-index: 100;
top:0;
position: fixed;
width:100%;
color:${({ active }) => (active ? "#000000" : "#fff")};
background-color:${({ active }) => (active ? "#1e9080f5" : "none")};
`
const NavLink = css`
color:${({ active }) => (active ? "#000000" : "#fff")};
display: flex;
align-items:center;
padding: 0 1rem;
height: 100%;
cursor: pointer;
text-decoration:none;
`

const Logo = styled(Link)`
${NavLink};
font-style:italic;
font-weight:bold;
`

const MenuBars = styled(TiThMenuOutline)`
display: none;

@media screen and (max-width: 768px){
    display:block;
    height: 75%;
    width: 20%;
    align-items:center;
    cursor: pointer;
    position:absolute;
    right:0; 
    padding:0 1rem;
    transform:translate(0%,-20%);
}
`

const NavMenu = styled.div`
display: flex;
align-items:center;
margin-right:-48px;

@media screen and (max-width: 768px){
    display:none;
}
`

const NavMenuLink = styled(Link)`
${NavLink};
font-weight:${({ selected }) => (selected ? "bold" : "")};
text-decoration:${({ selected }) => (selected ? "underline" : "")};
`

const NavBtn = styled.div`
display:flex;
align-items:center; 
margin-right:24px;

@media screen and (max-width: 768px){
    display:none;
}
`

function Navbar({ active, toggle }) {
    const [activeNavLink, setActiveNavLink] = useState("Home")

    return (
        <Nav active={active}>
            <Logo onClick={() => setActiveNavLink("Home")} active={active} to="/">SAP UNIVERSITY</Logo>
            <MenuBars onClick={toggle} />
            <NavMenu>
                {menuData.map((item, index) => (
                    <NavMenuLink selected={item.title === activeNavLink} active={active} to={item.link} onClick={() => setActiveNavLink(item.title)} key={index}>
                        {item.title}
                    </NavMenuLink>
                ))}
            </NavMenu>
            <NavBtn>
                <Button to="/contacts" primary="true" >
                    Contact Us
                </Button>
            </NavBtn>
        </Nav>
    )
}

export default Navbar
