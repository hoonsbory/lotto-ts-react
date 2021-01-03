import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import SlideFooterBtn from '../components/SlideFooterBtn'
import { useSelector } from 'react-redux'
import { StoreState } from '../store/index'
import { numberCounter } from '../components/RollingNum'

type Props = {
    upDownBtn?: boolean
    bg?: string
    color?: string
}

const FixedDiv = styled.div<Props>`
    position: fixed;
    bottom: ${props => props.upDownBtn ? 0 : -20}vh;
    z-index: 999;
    width: ${window.innerWidth > 400 ? "400px" : "95%"};
    left: 50%;
    transform: translateX(-50%);
    height: 20vh;
    background: white;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    box-shadow : rgba(0, 0, 0, 0.28) -1px 1px 20px;
    transition:all ease-out .5s;
`

const Title = styled.p`
    font-size : ${window.innerHeight > 568 ? "1.3em" : "1.1em"};
    font-weight : 600;
    margin-bottom : 0px;
    margin-top : 5px;
`
const LeftDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width : 60%;
    padding-left : 40px;
`
const RightDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 40%;
`

const MainDivWrap = styled.div`
    display : inline-flex;
    margin-bottom : 2vh;
    width : 100%;
`

const SmallSpan = styled.span`
    color : gray;
    font-size : ${window.innerHeight > 568 ? "1.1em" : ".9em"};
`
const MainCss = css`
    padding : 0px 4px;
    border-radius : 5px;
    font-weight : 600;
`
const MainSpan = styled.span`
    background : rgb(224,230,251);
    color : rgb(86,115,235);
    font-size : ${window.innerHeight > 568 ? "21px" : "1.1em"};
    ${MainCss}
    
`
const MainSpan2 = styled.span`
    background: rgba(235,83,116,0.12);
    color : rgb(235,83,116);
    font-size : ${window.innerHeight > 568 ? "21px" : "1.1em"};
    ${MainCss}
`
const MainSmallSpan = styled.span<Props>`
    font-size : ${window.innerHeight > 568 ? "15px" : "10px"};
    background : ${props => props.bg};
    color : ${props => props.color};
    margin-right : 3px;
    ${MainCss}
`


const UserResult = () => {

    const [upDownBtn, setUpDownBtn] = useState<boolean>(false)
    
    const UserResult = useSelector((state:StoreState)=> state.Reducer.userResult)

    useEffect(() => {
        if(upDownBtn){
            var sum = parseInt(UserResult.first) + parseInt(UserResult.second) + parseInt(UserResult.third) + parseInt(UserResult.fourth) + parseInt(UserResult.fifth) + parseInt(UserResult.last)
            new numberCounter("roll1", sum*1000, "원")
            new numberCounter("roll2", sum, "개")
        } 
    }, [upDownBtn,UserResult])

    return (
        <FixedDiv upDownBtn={upDownBtn}>
            <SlideFooterBtn upDownBtn={upDownBtn} setUpDownBtn={setUpDownBtn}></SlideFooterBtn>
            <div>
                <Title>내 로또 내역</Title>
            </div>
            <MainDivWrap>
                <LeftDiv>
                    <SmallSpan>소비 금액</SmallSpan>
                    <div><MainSpan id="roll1"></MainSpan></div>
                </LeftDiv>
                <RightDiv>
                    <SmallSpan>구매 수</SmallSpan>
                    <div><MainSpan2 id="roll2"></MainSpan2></div>
                </RightDiv>
            </MainDivWrap>
                <div style={{wordBreak: "break-word"}}>
                <MainSmallSpan bg="rgba(255,94,0,.12)" color="rgb(255,94,0)">1등 {UserResult.first || 0}회</MainSmallSpan>
                <MainSmallSpan bg="rgba(235,83,116,0.12)" color="rgb(235,83,116)">2등 {UserResult.second || 0}회</MainSmallSpan>
                <MainSmallSpan bg="rgb(224,230,251)" color="rgb(86,115,235)">3등 {UserResult.third || 0}회</MainSmallSpan>
                <MainSmallSpan>4등 {UserResult.fourth || 0}회</MainSmallSpan>
                <MainSmallSpan>5등 {UserResult.fifth || 0}회</MainSmallSpan>
                <MainSmallSpan>꽝 {UserResult.last || 0}회</MainSmallSpan>
                </div>
        </FixedDiv>
    )
}

export default UserResult
