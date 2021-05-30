import React, { useState } from 'react'
import styled from 'styled-components'
import TableWithTabs from './TableWithTabs'
import { TabsData } from '../data/TabsData'


const TableView = styled.div`
height: ${({ showFeaturesCount }) => `calc(${showFeaturesCount + 2} * 44px+30px);`};
position: relative;
background-color:#fff;
display:flex;
/* height: 330px; */
`

const VerticalTabs = styled.div`
width:125px;
display:flex;
flex-direction: column;
height: ${({ showFeaturesCount }) => `calc(${showFeaturesCount + 2} * 44px+30px);`};
flex-shrink:0;
background-color:#cccccc;
`

const VerticalTabButton = styled.button`
font-size:0.9em;
cursor:pointer;
display:block;
padding:12px;
width:100%;
height:100%;
border:none;
outline:none;
font-weight:${({ active }) => (active ? "bold" : "")};
border-radius:${({ active }) => (active ? "0 10px 10px 0" : "")};
border-right:${({ active }) => (active ? "5px solid #000000" : "")};
background:${({ active }) => (active ? "#dddddd" : "#eeeeee")};

:not(:last-of-type){
border-bottom:2px solid #cccccc;
}`

const TableSection = ({ showFeaturesCount, isOpen }) => {
    const [data, setData] = useState([])
    const [activeTabName, setActiveTabName] = useState(Object.keys(TabsData)[0])

    function handleClickOnTabSideBar(e) {
        e.preventDefault();
        setActiveTabName(e.target.innerText);
    }


    // useEffect(() => {

    //     axios.get(TabsData[activeTabName].subTabs[activeSubTabName])
    //         .then(res => res.data)
    //         .then(data => setData(data))
    // }, [])

    // useEffect(() => {
    //     axios.get(TabsData[activeTabName].subTabs[activeSubTabName])
    //         .then(res => res.data)
    //         .then(data => setData(data))
    // }, [activeSubTabName])
    return <TableView isOpen={isOpen}>
        <VerticalTabs>
            {Object.keys(TabsData).map((key, index) => (
                // <VerticalTabButton data-tab={JSON.stringify(tab)} onClick={handleClickOnTabSideBar} active={activeTab.title === tab.title}>
                <VerticalTabButton onClick={handleClickOnTabSideBar} active={activeTabName === TabsData[key].title}>
                    {TabsData[key].title}
                </VerticalTabButton>
            ))}
        </VerticalTabs>
        <TableWithTabs showFeaturesCount={showFeaturesCount} activeTabName={activeTabName} tableData={TabsData[activeTabName]} />
    </TableView>
}

export default TableSection;