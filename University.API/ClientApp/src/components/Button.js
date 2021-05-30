import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const buttonCss = css`
background: ${({ primary }) => (primary ? '#000d1a' : "#1e9080f5")};
white-space: nowrap;
outline: none;
height:50px;
min-width: 100px;
max-width: 200px;
text-decoration: none;
transition: 0.3s;
display: flex;
justify-content: center;
align-items: center;
padding: ${({ big }) => (big ? '16px 40px' : '14px 24px')};
color: ${({ primary }) => (primary ? '#fff' : '#000d1a')};
font-size: ${({ big }) => (big ? '20px' : '14px')};
font-weight: "bold";
border-radius: 50px;
box-shadow: 5px 5px 8px  #02312b;
`

export const Button = styled(Link)`
${buttonCss}
&:hover {
    transform:translateY(-2px);
}
`

export const FormButton = styled.button`
${buttonCss}
margin:auto;
`

export const TableButton = styled.button`
border: none;
background:none;
cursor: pointer;
`