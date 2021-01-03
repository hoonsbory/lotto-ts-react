import React from 'react'
import styled, { css } from 'styled-components'
import ResultNum from './ResultNum'

const NumLineWrapper = styled.p`
    border-bottom : 1px solid rgba(134,134,134,0.19);
    padding-bottom : 15px;
    animation: ${props => props.theme.fadeUp} .5s linear alternate;
`
type props = {
    content : any
}

const NumLineWrap = ({content}:props) => {
    return (
        <NumLineWrapper>
            {content}
        </NumLineWrapper>
    )
}

export default NumLineWrap
