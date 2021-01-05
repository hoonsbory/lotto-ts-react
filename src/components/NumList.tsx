import { useState } from 'react'
import styled, { css } from 'styled-components'

interface numSpanProps {
    selected?: boolean
}

interface props{
    content : number
    click : Function
    selected?: boolean
    id : string
}
//이런 식으로 자주 쓰일 것 같은 css를 만들어놓고 편리하게 사용 가능.
// const hoverForPC = css`
//     &:hover{
//         background : rgb(70, 77, 82);
//         color : white;
//     }
// `
const NumSpan = styled.button<numSpanProps>`
        @media(max-width : 414px){
            padding : 6px 0px;
            width : 30px;
            font-size : 12px;
        }
        width : 35px;
        outline : 0;
        cursor : pointer;
        border : 0;
        transition:all ease-out .3s;
        padding : 8px 0px;
        margin-bottom : 5px;
        margin-right : 5px;
        background : ${props => props.selected ? "rgb(70, 77, 82)" : "#EAEAEA"};
        color : ${props => props.selected ? "white" : "unset"};
        border-radius : 10px;
        font-weight : 600;
        ${sessionStorage.getItem("mobile")==="true" ? '': '&:hover{background : rgba(70, 77, 82,.7)}'}
    `





const NumList = ({content,click,selected,id}:props) => {
    
    return (
        <NumSpan id={id} selected={selected} onClick={()=>click(content)}>{content}</NumSpan>
    )
}

export default NumList
