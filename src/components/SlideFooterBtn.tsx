import React from 'react'
import styled from 'styled-components'
import DoubleArrow from './DoubleArrow'

//slide footer 버튼
type props={
    upDownBtn:boolean
    setUpDownBtn:Function
}
type props2={
    upDownBtn:boolean
}

const BtnDiv = styled.div<props2>`
    background : rgb(86,115,235);
    position : fixed;
    left: 50%;
    z-index : 998;
    transform: translateX(-50%);
    bottom: ${props => props.upDownBtn ? 148 : 0}px;
    width : 50px;
    height : 30px;
    box-shadow : rgba(0, 0, 0, 0.28) -1px 1px 20px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    transition:all ease-out .3s;
    cursor : pointer;
    @media(max-height : 568px){
        bottom: ${props => props.upDownBtn ? 110 : 0}px;
    }
    
`

const SlideFooterBtn = ({upDownBtn,setUpDownBtn}:props) => {
    const clickBtn = () => {
        if(upDownBtn) setUpDownBtn(false)
        else setUpDownBtn(true)
    }

    return (
        <BtnDiv upDownBtn={upDownBtn} id="footerBtn" onClick={clickBtn}>
            <DoubleArrow fill="white" upDown={upDownBtn}></DoubleArrow>
        </BtnDiv>
    )
}

export default SlideFooterBtn
