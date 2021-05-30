import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const HorizontalTabSection = styled.ul`
display:flex;
list-style:none;
margin:0;
padding:0;
background-color:#cccccc;
`

const SubTabButton = styled.button`
cursor:pointer;
display:block;
padding:12px;
width:100%;
border:none;
outline:none;
/* background:linear-gradient(#00C9FF,#009879) */
font-weight:${({ active }) => (active ? "bold" : "")};
border-radius:${({ active }) => (active ? "10px 10px 0 0" : "")};
border-bottom:${({ active }) => (active ? "2px solid #000000" : "")};
background:${({ active }) => (active ? "#1e9080f5" : "linear-gradient(#00C9FF,#009879)")};
color:#ffffff;
`

const SubTabs = ({ subTabsData }) => {
    const [activeSubTabName, setActiveSubTabName] = useState(Object.keys(subTabsData)[0])


    function handleClick(e) {
        e.preventDefault();
        setActiveSubTabName(e.target.innerText);
    }

    return <HorizontalTabSection>
        {Object.keys(subTabsData).map((tabName, index) => (
            <SubTabButton onClick={handleClick} active={activeSubTabName === tabName}>
                {tabName}
            </SubTabButton>
        ))}
    </HorizontalTabSection>
}

export default SubTabs;