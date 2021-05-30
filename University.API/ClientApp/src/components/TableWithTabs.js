import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import { BiBookAdd, BiRefresh } from 'react-icons/bi'
import { GiFinishLine, GiTeacher } from 'react-icons/gi'
import { TabsData } from '../data/TabsData'
import { TableButton } from '../components/Button'
import Pagination from './Pagination'

const TableWrapper = styled.div`
width:100%;
`

const Table = styled.table`
align-self:center;
border-collapse:collapse;
/* margin:25px auto; */
/* border-radius:10px 10px 0 0; */
font-size:0.9em;
min-width:600px;
overflow:hidden;
box-shadow: 0 0 20px rgba(0,0,0,0.15);
width:100%;
/* height:220px; */

tr{
:nth-of-type(even){
    background-color: #f3f3f3;
}
:last-of-type{
    border-bottom: 2px solid #009879;
}
}

th,td{
padding:12px 15px;
}
`
const TableHead = styled.thead`
background-color:#009879;
color:#ffffff;
text-align:left;
font-weight:bold;
`
const TableHeadRow = styled.tr`
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
height:44px;

:not(:last-of-type){
border-bottom:2px solid #dddddd;
}

.active-row{
font-weight:bold;
color:#009879;
}

&:hover {
    font-weight:bold;
    color:#009879;
    transform: scale(1.01);
    box-shadow:  20px 20px 20px rgba(0,0,0,0.15);
}
`
const TableData = styled.td``

const HorizontalTabSection = styled.ul`
display:flex;
list-style:none;
margin:0;
padding:0;
background:none;
min-width:600px;
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
/* border-radius:${({ active }) => (active ? "10px 10px 0 0" : "")}; */
border-radius:10px 10px 0 0;
border-bottom:${({ active }) => (active ? "2px solid #000000" : "")};
background:${({ active }) => (active ? "#1e9080f5" : "linear-gradient(#00C9FF,#009879)")};
color:#ffffff;
`

const RereshButton = styled.button`
/* position:absolute;
left:50px; */
margin-right: auto;

border:none;
background:none;
`

const EditIcon = styled(AiTwotoneEdit)`
cursor:pointer;
`
const DeleteIcon = styled(AiFillDelete)`
cursor:pointer;
`
const AddSubjectIcon = styled(BiBookAdd)`
cursor:pointer;
`

const RefreshIcon = styled(BiRefresh)`
cursor:pointer;
`

const MarkAsFinishedIcon = styled(GiFinishLine)`
cursor:pointer;
`
const ChangeTeacherIcon = styled(GiTeacher)`
cursor:pointer;
`




const TableWithTabs = ({ showFeaturesCount, activeTabName, showForm, tableData, entity }) => {
    const [data, setData] = useState([])
    const [deleteUrl, setDeleteUrl] = useState("")
    const [activeSubTabName, setActiveSubTabName] = useState("")
    const [pageIndex, setPageIndex] = useState(1)
    const [lastPageIndex, setLastPageIndex] = useState(1)
    const [startFeatureIndex, setStartFeatureIndex] = useState(1)
    const [endFeatureIndex, setEndFeatureIndex] = useState(1)
    const [lackOfData, setLackOfData] = useState(0)
    const [canPreviousPage, setCanPreviousPage] = useState(false)
    const [canNextPage, setCanNextPage] = useState(true)

    const addSubjectUrl = "https://localhost:44379/students/register-subject";
    const markSubjectAsFinishedUrl = "https://localhost:44379/students/successfull-finished-subject";
    const setTeacherUrl = "https://localhost:44379/teachers/register-subject";

    const handleClickOnSubTabs = (e) => {
        e.preventDefault();
        setActiveSubTabName(e.target.id);
    }

    const handleDeleteFeature = (e, id) => {
        e.preventDefault();
        axios.get(deleteUrl + '/' + id)
    }

    const nextPage = () => {
        setPageIndex(pageIndex + 1)
    }

    const previousPage = () => {
        setPageIndex(pageIndex - 1)
    }

    const refreshData = () => {
        axios.get(tableData.subTabs[activeSubTabName].url)
            .then(res => res.data)
            .then(data => setData(data))
    }

    useEffect(() => {
        setActiveSubTabName(Object.keys(TabsData[activeTabName].subTabs)[0])
    }, [])

    useEffect(() => {
        if (entity) {
            setDeleteUrl(`https://localhost:44379/${entity.toLowerCase()}/delete`)
        }
    }, [entity])


    useEffect(() => {
        let firstTabName = Object.keys(TabsData[activeTabName].subTabs)[0];
        if (firstTabName == activeSubTabName) {
            axios.get(tableData.subTabs[activeSubTabName].url)
                .then(res => res.data)
                .then(data => setData(data))

            if (!data || data.length === 0) {
                let lastIndex = Math.ceil(data.length / showFeaturesCount)
                setLastPageIndex(lastIndex)
            }
        }
        setActiveSubTabName(Object.keys(TabsData[activeTabName].subTabs)[0])
    }, [activeTabName])

    useEffect(() => {
        setPageIndex(1);

        if (tableData.subTabs[activeSubTabName]) {
            axios.get(tableData.subTabs[activeSubTabName].url)
                .then(res => res.data)
                .then(data => setData(data))
        }
    }, [activeSubTabName])

    useEffect(() => {
        if (data || data.length > 0) {
            let lastPage = Math.ceil(data.length / showFeaturesCount)
            setLastPageIndex(lastPage)
        }
    }, [data])

    useEffect(() => {
        let startIndex = (pageIndex - 1) * showFeaturesCount;
        let endIndex = startIndex + showFeaturesCount;
        let lackQuantity = data.length - startIndex - showFeaturesCount;

        setStartFeatureIndex(startIndex);
        setEndFeatureIndex(endIndex);
        setCanPreviousPage(pageIndex > 1)
        setCanNextPage(pageIndex < lastPageIndex)
        setLackOfData(lackQuantity < 0 ? Math.abs(lackQuantity) : 0);
    }, [data, lastPageIndex, pageIndex])

    return (
        !data || data.length === 0
            ? "No found data"
            : <TableWrapper>
                <HorizontalTabSection>
                    {Object.keys(tableData.subTabs).map((tabName, index) => (
                        <SubTabButton id={tabName} onClick={handleClickOnSubTabs} active={activeSubTabName === tabName}>
                            {tableData.subTabs[tabName].label}
                        </SubTabButton>
                    ))}
                </HorizontalTabSection>
                <Table >
                    <TableHead>
                        <TableHeadRow>
                            {Object.keys(data[0]).map((col, index) =>
                                <th key={`thead-th-${index}`}>{col}</th>)
                            }
                            {entity ? <th style={{ padding: "12px 15px", width: "90px", minWidth: "90px" }} key={`thead-th-actions}`}>Actions</th> : null}
                        </TableHeadRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.slice(startFeatureIndex, endFeatureIndex).map((row, index) =>
                                <TableRow key={`tbody-tr-${index}`} id={row.id}>
                                    {Object.values(row).map((colValue, index) =>
                                        <TableData key={`tbody-tr-td-${index}`}>
                                            {Array.isArray(colValue)
                                                ? colValue.join(', ')
                                                : colValue === ""
                                                    ? "-"
                                                    : colValue
                                            }
                                        </TableData>
                                    )}
                                    {entity
                                        ?
                                        <TableData>
                                            <TableButton
                                                title={"Edit"}
                                                onClick={(e) => { showForm(e, "edit", row.id); }}>
                                                <EditIcon />
                                            </TableButton>
                                            <TableButton
                                                title={"Delete"}
                                                onClick={(e) => handleDeleteFeature(e, row.id)}>
                                                <DeleteIcon />
                                            </TableButton>
                                            {
                                                entity === "Students"
                                                    ? <React.Fragment>
                                                        <TableButton
                                                            title={"Add subject"}
                                                            onClick={(e) => { showForm(e, "add-subject", row.id); }}>
                                                            <AddSubjectIcon />
                                                        </TableButton>
                                                        <TableButton
                                                            title={"Set as finished"}
                                                            onClick={(e) => { showForm(e, "mark-subject-as-finished", row.id); }}>
                                                            <MarkAsFinishedIcon />
                                                        </TableButton>
                                                    </React.Fragment>
                                                    : entity === "Teachers"
                                                        ? <React.Fragment>
                                                            <TableButton
                                                                title={"Set subject to teacher"}
                                                                onClick={(e) => { showForm(e, "set-subject-to-teacher", row.id); }}>
                                                                <ChangeTeacherIcon />
                                                            </TableButton>
                                                        </React.Fragment>
                                                        : ""
                                            }
                                        </TableData>
                                        :
                                        null}
                                </TableRow>)


                        }
                        {[...Array(lackOfData)].map((x) =>
                            <TableRow>
                                {Object.keys(data[0]).map((col, index) =>
                                    <TableData />)
                                }
                                {entity
                                    ? <TableData />
                                    : null}
                            </TableRow>)}
                    </TableBody>
                </Table>
                <div style={{
                    display: 'flex', justifyContent: "center"
                }}>
                    <RereshButton
                        title={"Refresh"}
                        onClick={refreshData}>
                        <RefreshIcon size={24} />
                    </RereshButton>
                    <Pagination
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                        moveToNextPage={nextPage}
                        moveToPreviousPage={previousPage}
                        pageIndex={pageIndex}
                        lastPageIndex={lastPageIndex} />
                </div>
            </TableWrapper >
    )
}

export default TableWithTabs;

    // const handleAddSubject = (values) => {
    //     axios.post(addSubjectUrl, values)
    // }
    // const handleSetSubjectAsFinished = (values) => {
    //     axios.post(markSubjectAsFinishedUrl, values)
    // }
    // const handleChangeTeacher = (values) => {
    //     axios.post(setTeacherUrl, values)
    // }
