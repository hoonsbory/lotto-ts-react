import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import SlideFooterBtn from '../components/SlideFooterBtn'
import { useSelector } from 'react-redux'
import { StoreState } from '../store/index'
import { numberCounter } from '../components/RollingNum'
//하단 슬라이드 footer
//로컬스토리지에 저장된 유저의 로또 내역을 보여줌.
type Props = {
    upDownBtn?: boolean
    bg?: string
    color?: string
}

const FixedDiv = styled.div<Props>`
    position: fixed;
    bottom: ${props => props.upDownBtn ? 0 : -143}px;
    z-index: 998;
    width: 400px;
    left: 50%;
    transform: translateX(-50%);
    height: 148px;
    background: white;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    box-shadow : rgba(0, 0, 0, 0.28) -1px 1px 20px;
    transition:all ease-out .3s;
    overflow-y : auto;
    @media(max-height : 568px){
        height : 110px;
        bottom: ${props => props.upDownBtn ? 0 : -110}px;
    }
    @media(max-width : 400px){
        width : 95%;
    }
`

const Title = styled.p`
    font-size : 1.3em;
    font-weight : 600;
    margin-bottom : 0px;
    margin-top : 5px;
    @media(max-height : 568px){
        font-size : 15px;
    }
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
    font-size : 1.1em;
    @media(max-height : 568px){
        font-size : .9em
    }
`
const MainCss = css`
    padding : 0px 4px;
    border-radius : 5px;
    font-weight : 600;
`
const MainSpan = styled.span`
    background : rgb(224,230,251);
    color : rgb(86,115,235);
    font-size : 21px;
    @media(max-height : 568px){
        font-size : 16px;
    }
    ${MainCss}
    
`
const MainSpan2 = styled.span`
    background: rgba(235,83,116,0.12);
    color : rgb(235,83,116);
    font-size : 21px;
    @media(max-height : 568px){
        font-size : 16px;
    }
    ${MainCss}
`
const MainSmallSpan = styled.span<Props>`
    font-size : 13px;
    background : ${props => props.bg};
    color : ${props => props.color};
    margin-right : 3px;
    @media(max-height : 568px){
        font-size : 10px;
    }
    ${MainCss}
`
const MainSmallSpanWrapper = styled.div`
    word-break : keep-word;
    padding : 0px 4px;
    overflow-y : auto;
`

const UserResult = () => {

    //슬라이드 버튼
    const [upDownBtn, setUpDownBtn] = useState<boolean>(false)
    //유저 로또 정보
    const UserResult = useSelector((state: StoreState) => state.Reducer.userResult)

    useEffect(() => {
        //footer slide up시 숫자 롤링
        if (upDownBtn) {
            var sum = parseInt(UserResult.first) + parseInt(UserResult.second) + parseInt(UserResult.third) + parseInt(UserResult.fourth) + parseInt(UserResult.fifth) + parseInt(UserResult.last)
            new numberCounter("roll1", sum * 1000, "원")
            new numberCounter("roll2", sum, "개")
        }
    }, [upDownBtn, UserResult])

    return (
        <div>
            <SlideFooterBtn upDownBtn={upDownBtn} setUpDownBtn={setUpDownBtn}/>
            <FixedDiv upDownBtn={upDownBtn}>
                <MainSmallSpanWrapper>
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
                    <MainSmallSpan bg="rgba(255,94,0,.12)" color="rgb(255,94,0)">1등 {UserResult.first}회</MainSmallSpan>
                    <MainSmallSpan bg="rgba(235,83,116,0.12)" color="rgb(235,83,116)">2등 {UserResult.second}회</MainSmallSpan>
                    <MainSmallSpan bg="rgb(224,230,251)" color="rgb(86,115,235)">3등 {UserResult.third}회</MainSmallSpan>
                    <MainSmallSpan>4등 {UserResult.fourth}회</MainSmallSpan>
                    <MainSmallSpan>5등 {UserResult.fifth}회</MainSmallSpan>
                    <MainSmallSpan>꽝 {UserResult.last}회</MainSmallSpan>
                </MainSmallSpanWrapper>
            </FixedDiv>
        </div>
    )
}

export default UserResult
