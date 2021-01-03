import React from 'react'
import styled from 'styled-components'
import DoubleArrow from './DoubleArrow'

const BtnDiv = styled.div`
    background : rgb(86,115,235);
    position : fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom : 20vh;
    width : 50px;
    height : 30px;
    box-shadow : rgba(0, 0, 0, 0.28) -1px 1px 20px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    cursor : pointer;
    
`
type props={
    upDownBtn:boolean
    setUpDownBtn:Function
}
const SlideFooterBtn = ({upDownBtn,setUpDownBtn}:props) => {
    const clickBtn = () => {
        if(upDownBtn) setUpDownBtn(false)
        else setUpDownBtn(true)
    }

    return (
        <BtnDiv id="footerBtn" onClick={clickBtn}>
            <DoubleArrow fill="white" upDown={upDownBtn}></DoubleArrow>
        </BtnDiv>
    )
}

export default SlideFooterBtn
