import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TableWithTabs from './TableWithTabs'
import { TabsData } from '../data/TabsData'
import { Button } from "./Button"
import Form from './Form/Form'


const TableView = styled.div`
height:${({ showFeaturesCount }) => `calc(${showFeaturesCount + 2} * 44px+30px);`};
padding-left:20px;
padding-right:20px;
padding-bottom:100px;
`

const ButtonWrapper = styled.div`
padding:20px;
padding-bottom:50px;
`

const FixedButton = styled(Button)`
/* float: right; */
position:fixed;
right:3%;
bottom:7%;
`

const PageView = styled.div`
h1{
    text-align:center;
    text-transform: uppercase;
    text-decoration: underline;
    padding-top:60px;
    margin:1rem;
    font-size: clamp(1.5rem,6vw,2rem);
}

p{
    padding:20px;
    text-align: justify;
    margin-bottom:2rem;
}
`

const Page = ({ entity, header, desctiption }) => {
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [formOperation, setFormOperation] = useState("");
    const [formData, setFormData] = useState({});
    const [entityId, setEntityId] = useState("");

    const hideForm = () => {
        setFormIsOpen(false);
        setFormData({});
    }

    const showForm = (e, operation, id) => {
        e.preventDefault();
        setFormOperation(operation);
        setEntityId(id);
        setFormIsOpen(true);
    }



    useEffect(() => {
        if (formIsOpen) {

            let properties = TabsData[entity][formOperation === "edit" ? "add" : formOperation];
            setFormData(properties)
        }
    }, [formIsOpen, formOperation])

    return (
        <PageView>
            <h1>{header}</h1>
            <p>{desctiption + desctiption + desctiption + desctiption + desctiption + desctiption + desctiption + desctiption}</p>
            <ButtonWrapper>
                <FixedButton onClick={(e) => showForm(e, "add")}>
                    ADD
                </FixedButton>
            </ButtonWrapper>
            <TableView showFeaturesCount={7}>
                <TableWithTabs showFeaturesCount={7} activeTabName={entity} showForm={showForm} entity={entity} tableData={TabsData[entity]} />
            </TableView>
            <div>
                <Form
                    hideForm={hideForm}
                    formData={formData}
                    formIsOpen={formIsOpen}
                    formOperation={formOperation}
                    entity={entity}
                    entityId={entityId}
                />
            </div>
        </PageView >
    )
}

export default Page;