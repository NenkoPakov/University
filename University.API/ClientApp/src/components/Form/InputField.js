import React from 'react'
import styled from 'styled-components/macro'

const InputContainer = styled.div`
   margin-bottom:15px;
   max-width:300px;

    &[data-error] .input{
    border-color:red;
    color:red;
    background:white;
    }

    &[data-error]::after{
        content:attr(data-error);
        color:red;
        display:block;
        margin:10px 0;
    }
`;


const Input = styled.input`
display:block;
width:100%;
padding:12px;
border:2px solid #dddddd;
border-radius:5px;
margin:auto;
background-color:${({ label }) => (label === "id" ? "#dddddd" : null)};
`



function InputField({ label, name, type, placeholder, value, handleChange }) {
    return (
        <InputContainer>
            <label style={{ textDecoration: "underline", fontWeight: 'bold', fontSize: "20px" }} htmlFor={name}>{label}</label>
            <Input
                label={label}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                readOnly={label === "id" ?? "true"}>
            </Input>
        </InputContainer>
    )
}

export default InputField
