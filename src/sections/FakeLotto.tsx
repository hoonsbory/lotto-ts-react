import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/FakeLottoStore';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LineDiv from '../components/LineDiv';
import { Debounce } from '../Debounce'
import SubTitle from '../components/SubTitle';
import NotSpeedMode from '../components/NotSpeedMode';
import SpeedMode from '../components/SpeedMode';
import ButtonGroup from '../components/ButtonGroup';
//가상로또 섹션
//스피드모드와 일반 모드

const Section = styled.section`
    ${props => props.theme.sectionCss}
`


const FakeLotto = () => {
    //번호 리스트 ,추첨기 온오프 ,1~45까지 당첨된 번호  Boolean배열 ,1~45까지 당첨된 보너스 번호 Boolean배열 ,추첨이 완료되고 계산에 들어가게 하는 트리거
    const {list,drawCheck,corrected,bonusCorrect,resultTrigger} = useSelector((state: StoreState) => state.Reducer);

    const dispatch = useDispatch();

    const setList = (list: number[][]) => dispatch(actionCreators.list(list))
    
    const setDraw = (value: boolean) => dispatch(actionCreators.drawCheck(value))
    
    const setCorrect = (value: boolean[]) => dispatch(actionCreators.corrected(value))
    
    const setbonusCorrect = (value: boolean[]) => dispatch(actionCreators.bonusCorrect(value))
    
    const setTrigger = (value: boolean) => dispatch(actionCreators.resultTrigger(value))
    
    const setUserResult = (value: any) => dispatch(actionCreators.userResult(value))
    
    //토글 버튼
    const [modeBtn, setModeBtn] = useState<boolean[]>([true, false])


    useEffect(() => {
        //로컬스토리지에 있는 유저의 로또 내역 state에 저장
        var result = localStorage.getItem("userResult")
        if (result) setUserResult(JSON.parse(result))
    }, [])





    const modeChange = Debounce((check: boolean) => {
        if(modeBtn[0]&&check) return
        if(!modeBtn[0]&&!check) return

        setTrigger(false) //모드 체인지시에 남아있던 List가 새 모드에서 생성되면서 계산을 또 하기 때문에 false를 줘서 Rank생성 막음
        setDraw(false) //추첨기를 미리 false를 줘서 없애줘야 새 모드에서 인터벌이 겹치지 않는다.
        setCorrect([])
        setbonusCorrect([])
        if (check) { //스피드모드로 변경 후 추첨을 안하고 다시 일반모드로 올 때 리스트 남겨둠. 
            if (list.length > 100) setList([[]])
            setModeBtn([true, false])

        }
        else {
            setModeBtn([false, true])
        }

    }, 200)

    return (
        <Section>
            <SubTitle content="가상 로또 추첨"></SubTitle>
            <LineDiv content={<ButtonGroup id={["normalMode", "speedMode"]} content={["일반모드", "스피드모드"]} selected={modeBtn} click={[() => modeChange(true), () => modeChange(false)]}></ButtonGroup>}></LineDiv>
            {modeBtn[0] ? <NotSpeedMode list={list} draw={drawCheck} correct={corrected} bonusCorrect={bonusCorrect} trigger={resultTrigger} setList={setList} setDraw={setDraw} setCorrect={setCorrect} setbonusCorrect={setbonusCorrect} setTrigger={setTrigger} setUserResult={setUserResult}></NotSpeedMode> : <SpeedMode list={list} draw={drawCheck} correct={corrected} bonusCorrect={bonusCorrect} trigger={resultTrigger} setList={setList} setDraw={setDraw} setCorrect={setCorrect} setbonusCorrect={setbonusCorrect} setTrigger={setTrigger} setUserResult={setUserResult}></SpeedMode>}
        </Section>
    )
}

export default FakeLotto

