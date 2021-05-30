import React, { useState } from 'react'
import styled from 'styled-components'

const VerticalTabs = styled.div`
display:flex;
width:125px;
height:100%;
flex-shrink:0;
background-color:#cccccc;
`

const TabButton = styled.button`
font-size:0.9em;
cursor:pointer;
display:block;
padding:12px;
width:100%;
border:none;
outline:none;
font-weight:${({ active }) => (active ? "bold" : "")};
border-radius:${({ active }) => (active ? "0 10px 10px 0" : "")};
border-right:${({ active }) => (active ? "5px solid #000000" : "")};
background:${({ active }) => (active ? "#dddddd" : "#eeeeee")};

:not(:last-of-type){
border-bottom:2px solid #cccccc;
}`


const TabSidebar = ({ tabsData }) => {
    const [activeTab, setActiveTab] = useState(tabsData[0])
    // const [activeSubTab, setActiveSubTab] = useState(tabsData[0])



    function handleClick(e) {
        e.preventDefault();
        setActiveTab(JSON.parse(e.target.attributes["data-tab"].value));
    }

    return <VerticalTabs>
        {tabsData.map((tab, index) => (
            <TabButton data-tab={JSON.stringify(tab)} onClick={handleClick} active={activeTab.title === tab.title}>
                {tab.title}
            </TabButton>
        ))}
    </VerticalTabs>
}

export default TabSidebar