import React from 'react'
import styled from 'styled-components'
import { BiSkipNextCircle, BiSkipPreviousCircle } from 'react-icons/bi'
import { TableButton } from '../components/Button'


const NextButton = styled(BiSkipNextCircle)`
`
const PreviousButton = styled(BiSkipPreviousCircle)`
`

const PaginationContainer = styled.div`
display:flex;
margin-right: auto;
height:30px;
`
const PagesInfo = styled.div`
display:flex;
align-items: center;
`



const Pagination = ({ canNextPage, canPreviousPage, moveToNextPage, moveToPreviousPage, pageIndex, lastPageIndex }) => {
    return <PaginationContainer>
        <TableButton
            title={"Previous page"}
            disabled={!canPreviousPage}
            onClick={moveToPreviousPage}>
            <PreviousButton size={24} />
        </TableButton>
        <PagesInfo>
            {`${pageIndex} of ${lastPageIndex}`}
        </PagesInfo>
        <TableButton
            title={"Next page"}
            disabled={!canNextPage}
            onClick={moveToNextPage}>
            <NextButton size={24} />
        </TableButton>
    </PaginationContainer>
}

export default Pagination;