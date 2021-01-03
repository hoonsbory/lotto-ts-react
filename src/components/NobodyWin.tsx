import React from 'react'
import styled from 'styled-components'



const GoLotto = styled.span`
    cursor : pointer;
    text-decoration : underline;
    color : rgba(235,83,116,0.72);
    &:hover{
        color : rgb(235,83,116);
    }
`
type props = {
    content : string
}

const NobodyWin = ({content}:props) => {
    return (
        <div>
            <h4>{content}</h4>
            <GoLotto onClick={()=> window.scrollTo(0,0)}>추첨하러가기</GoLotto>
        </div>
    )
}

export default NobodyWin
