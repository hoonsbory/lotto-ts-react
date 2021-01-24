import React from 'react'
import styled from 'styled-components'
import LoadingSvg from './LoadingSvg'
//로딩 컴포넌트
const Bg = styled.div`
    width : 100%;
    height : 130%;
    left : 0;
    bottom : 0;
    position : fixed;
    background : rgba(0,0,0,.5);
    display : none;
    transition : all ease-out .3s;
    z-index : 999;
`

const CenterDiv = styled.div`
    position : fixed;
    left : 50%;
    top : 50%;
    transform : translate(-50%,-50%);
    padding: 10px;
    background : white;
    border-radius : 15px;
    font-size : 13px;
`

const Loading = () => {
    return (
        <Bg id="loadingBg">
            <CenterDiv>
                <LoadingSvg></LoadingSvg>
                <span>번호를 조합 중입니다</span>
            </CenterDiv>
        </Bg>
    )
}

export default Loading
